const http = require('http');
const express = require('express');
const fs = require('fs/promises');
const { Server: SocketIO } = require('socket.io');
const path = require('path');
const cors = require('cors');
const chokidar = require('chokidar');
const pty = require('node-pty');


const app = express();
const server = http.createServer(app);

const io = new SocketIO(server, {
    cors: {
        origin: '*',
    },
});

let folderName = path.join(__dirname, 'user');
let watcher = null;
let ptyProcess = null;

app.use(cors());
app.use(express.json()); 

app.get('/dirname', async (req, res) => {
    const { dirname } = req.query;

    if (!dirname) {
        return res.status(400).json({ error: 'dirname is required' });
    }

    folderName = path.join(__dirname, dirname);

    try {
        await fs.access(folderName);
        console.log(`Directory exists: ${folderName}`);
    } catch (err) {
        try {
            await fs.mkdir(folderName, { recursive: true });
            console.log(`Directory created: ${folderName}`);
        } catch (mkdirErr) {
            console.error('Error creating directory:', mkdirErr);
            return res.status(500).json({ error: 'Failed to create directory' });
        }
    }


    restartWatcher(folderName);
    restartPty(folderName);

    return res.status(200).json({ message: `Directory is ready: ${folderName}` });
});




app.get('/files', async (req, res) => {
    try {
        const fileTree = await generateFileTree(folderName);
        res.json({ tree: fileTree });
    } catch (err) {
        console.error('Error generating file tree:', err);
        res.status(500).json({ error: 'Failed to retrieve file tree' });
    }
});




app.get('/files/content', async (req, res) => {
    const filePath = req.query.path;

    if (!filePath) {
        return res.status(400).json({ error: 'path query parameter is required' });
    }

    const absolutePath = path.join(folderName, filePath);

    try {
        const content = await fs.readFile(absolutePath, 'utf-8');
        res.json({ content });
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Failed to read file content' });
    }
});



io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);


    socket.emit('file:refresh');


    socket.on('file:change', async ({ path: filePath, content }) => {
        const absolutePath = path.join(folderName, filePath);
        try {
            await fs.writeFile(absolutePath, content, 'utf-8');
            console.log(`File updated: ${absolutePath}`);
        } catch (err) {
            console.error('Error writing file:', err);
            socket.emit('error', { message: 'Failed to write file' });
        }
    });

    
    socket.on('terminal:write', (data) => {
        if (ptyProcess) {
            ptyProcess.write(data);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});



const PORT = 9000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    
    restartWatcher(folderName);
    restartPty(folderName);
});


function restartWatcher(directory) {
    if (watcher) {
        watcher.close();
    }

    watcher = chokidar.watch(directory, {
        ignoreInitial: true,
        ignored: /(^|[\/\\])node_modules([\/\\]|$)/, 
        persistent: true,
    });

    watcher.on('all', (event, filePath) => {
        console.log(`File ${event}: ${filePath}`);
        io.emit('file:refresh', filePath);
    });

    watcher.on('error', (error) => {
        console.error('Watcher error:', error);
    });

    console.log(`Started watching directory: ${directory} (node_modules is ignored)`);
}


function restartPty(cwd) {
    if (ptyProcess) {
        ptyProcess.kill();
    }

    ptyProcess = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd,
        env: process.env,
    });

    ptyProcess.onData((data) => {
        io.emit('terminal:data', data);
    });

    ptyProcess.onExit(() => {
        console.log('PTY process exited');
    });

    console.log(`PTY process started in directory: ${cwd}`);
}



const IGNORE_DIRS = ['node_modules'];

async function generateFileTree(directory) {
    const tree = {};

    async function buildTree(currentDir, currentTree) {
        let entries;
        try {
            entries = await fs.readdir(currentDir, { withFileTypes: true });
        } catch (err) {
            console.error(`Error reading directory: ${currentDir}`, err);
            return;
        }

        const filteredEntries = entries.filter(
            (entry) => !IGNORE_DIRS.includes(entry.name)
        );

        await Promise.all(
            filteredEntries.map(async (entry) => {
                const entryPath = path.join(currentDir, entry.name);
                if (entry.isDirectory()) {
                    currentTree[entry.name] = {};
                    await buildTree(entryPath, currentTree[entry.name]);
                } else {
                    currentTree[entry.name] = null;
                }
            })
        );
    }

    await buildTree(directory, tree);
    return tree;
}
