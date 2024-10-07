const http = require('http');
const express = require('express');
const fs = require('fs/promises');
const { Server: SocketIO } = require('socket.io');
const path = require('path');
const cors = require('cors');
const chokidar = require('chokidar');
const pty = require('node-pty');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new SocketIO(server, {
    cors: {
        origin: '*',
    },
});

// Define the initial folder name
let folderName = path.join(__dirname, 'user');
let watcher = null;
let ptyProcess = null;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

/**
 * Route: GET /dirname
 * Description: Sets the directory name, creates it if it doesn't exist, and starts watching it.
 */
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

    // Restart watcher and PTY with the new folder
    restartWatcher(folderName);
    restartPty(folderName);

    return res.status(200).json({ message: `Directory is ready: ${folderName}` });
});

/**
 * Route: GET /files
 * Description: Retrieves the file tree of the current directory.
 */
app.get('/files', async (req, res) => {
    try {
        const fileTree = await generateFileTree(folderName);
        res.json({ tree: fileTree });
    } catch (err) {
        console.error('Error generating file tree:', err);
        res.status(500).json({ error: 'Failed to retrieve file tree' });
    }
});

/**
 * Route: GET /files/content
 * Description: Retrieves the content of a specific file.
 */
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

/**
 * Socket.IO Connection Handler
 */
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Emit initial file refresh
    socket.emit('file:refresh');

    /**
     * Handle file changes from clients
     */
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

    /**
     * Handle terminal input from clients
     */
    socket.on('terminal:write', (data) => {
        if (ptyProcess) {
            ptyProcess.write(data);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

/**
 * Start the server
 */
const PORT = 9000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    // Initialize watcher and PTY on server start
    restartWatcher(folderName);
    restartPty(folderName);
});

/**
 * Starts or restarts the file watcher for the specified directory.
 * @param {string} directory - The directory to watch.
 */
function restartWatcher(directory) {
    if (watcher) {
        watcher.close();
    }

    watcher = chokidar.watch(directory, { ignoreInitial: true });

    watcher.on('all', (event, filePath) => {
        console.log(`File ${event}: ${filePath}`);
        io.emit('file:refresh', filePath);
    });

    watcher.on('error', (error) => {
        console.error('Watcher error:', error);
    });

    console.log(`Started watching directory: ${directory}`);
}

/**
 * Starts or restarts the PTY process for the specified directory.
 * @param {string} cwd - The current working directory for the PTY.
 */
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

/**
 * Generates a file tree structure for the specified directory.
 * @param {string} directory - The root directory to generate the tree from.
 * @returns {Object} - The file tree.
 */
async function generateFileTree(directory) {
    const tree = {};

    async function buildTree(currentDir, currentTree) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                currentTree[entry.name] = {};
                await buildTree(entryPath, currentTree[entry.name]);
            } else {
                currentTree[entry.name] = null;
            }
        }
    }

    await buildTree(directory, tree);
    return tree;
}
