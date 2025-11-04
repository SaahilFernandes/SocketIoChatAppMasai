const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // The origin of your React app
        methods: ["GET", "POST"]
    }
});

// In-memory storage
let users = [];
const ADMIN_BOT = "Admin";

// Helper function to format messages
const formatMessage = (username, message) => {
    return {
        username,
        message,
        timestamp: new Date().toLocaleTimeString(),
        isAdmin: username === ADMIN_BOT
    };
};

// Listen for a client connection
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Listen for 'joinRoom' event
    socket.on('joinRoom', ({ username, room }) => {
        // Add user to the in-memory array
        const user = { id: socket.id, username, room };
        users.push(user);
        
        // Join the specified room
        socket.join(room);

        // Welcome message to the user who joined
        socket.emit('message', formatMessage(ADMIN_BOT, `Welcome to the ${room} room, ${username}!`));

        // Broadcast to everyone else in the room that a user has joined
        socket.broadcast.to(room).emit('message', formatMessage(ADMIN_BOT, `${username} has joined the chat.`));
        
        // Send the updated list of users in the room
        const roomUsers = users.filter(u => u.room === room);
        io.to(room).emit('roomUsers', { users: roomUsers });
    });

    // Listen for 'chatMessage' from a user
    socket.on('chatMessage', (message) => {
        const user = users.find(u => u.id === socket.id);
        if (user) {
            // Emit the message to everyone in the user's room
            io.to(user.room).emit('message', formatMessage(user.username, message));
        }
    });

    // (Optional Extra Credit) Listen for admin broadcast
    socket.on('adminBroadcast', (message) => {
        io.emit('message', formatMessage(ADMIN_BOT, `[BROADCAST] ${message}`));
    });

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
        // Find the user who disconnected
        const userIndex = users.findIndex(u => u.id === socket.id);

        if (userIndex !== -1) {
            const user = users.splice(userIndex, 1)[0];
            // Notify the room that the user has left
            io.to(user.room).emit('message', formatMessage(ADMIN_BOT, `${user.username} has left the chat.`));
            
            // Send the updated user list for that room
            const roomUsers = users.filter(u => u.room === user.room);
            io.to(user.room).emit('roomUsers', { users: roomUsers });
        }
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));