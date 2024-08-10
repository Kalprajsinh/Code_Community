const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', ({ room, username }) => {
    socket.join(room);
    if (!rooms[room]) {
      rooms[room] = [];
    }
    rooms[room].push({ id: socket.id, username });
    console.log(`${username} joined room: ${room}`);
    io.to(room).emit('room_users', rooms[room]);
  });

  // Handle incoming messages
  socket.on('text', (room, message) => {
    socket.to(room).emit('text', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    for (const room in rooms) {
      const index = rooms[room].findIndex(user => user.id === socket.id);
      if (index !== -1) {
        rooms[room].splice(index, 1);
        io.to(room).emit('room_users', rooms[room]);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
