const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://codev.vercel.app',
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'https://codev.vercel.app'
}));

const rooms = {};
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle room joining
  socket.on('join_room', ({ room, username }) => {
    socket.join(room);
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push({ id: socket.id, username });
    console.log(`${username} joined room: ${room}`);
    io.to(room).emit('room_users', rooms[room]);
  });

  // Handle messaging within the room
  socket.on('text', (room, message) => {
    socket.to(room).emit('text', message);
  });

  // Room joining with email
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  // WebRTC signaling events
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);

    // Remove user from room users list
    for (const room in rooms) {
      const index = rooms[room].findIndex(user => user.id === socket.id);
      if (index !== -1) {
        rooms[room].splice(index, 1);
        io.to(room).emit('room_users', rooms[room]);
        break;
      }
    }

    // Remove user from email-socket maps
    const email = socketidToEmailMap.get(socket.id);
    if (email) {
      emailToSocketIdMap.delete(email);
      socketidToEmailMap.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
