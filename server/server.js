import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import router from './routes/recipes.routes.js';
import http from 'http'; // Import HTTP module to create server
import { Server as SocketIOServer } from 'socket.io'; // Import Socket.IO
import jwt from 'jsonwebtoken'; // Import JWT for token verification

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app); // Create HTTP server
const io = new SocketIOServer(server); // Attach Socket.IO to the HTTP server

// Middleware
app.use(express.json(), cors());  // Parse JSON requests

// Connect to the database
dbConnect();

// Routes
app.use('/api', authRoutes, router);  // Authentication routes

// Socket.IO middleware to authenticate token
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Unauthorized access. No token provided."));
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = verified;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        next(new Error("Invalid or expired token."));
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.id}`);
    
    // Handle incoming messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', { user: socket.user.id, message: msg });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
server.listen(PORT, () => { // Listen on the HTTP server, not the app
    console.log(`Server running on http://localhost:${PORT}`);
});
