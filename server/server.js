    import express from 'express';
    import dotenv from 'dotenv';
    import dbConnect from './config/dbConnect.js';
    import authRoutes from './routes/auth.routes.js';
    import cors from 'cors';
    import router from './routes/recipes.routes.js';
    import http from 'http';  // Import HTTP module to create server
    import { Server as SocketIOServer } from 'socket.io';  // Import Socket.IO
    import jwt from 'jsonwebtoken';  // Import JWT for token verification
    import msgRouter from './routes/chat.routes.js';
    import Message from './models/message.model.js';  // Import the Message model
    import multer from 'multer';
    dotenv.config();  // Load environment variables

    const app = express();
    const PORT = process.env.PORT || 8000;  // Ensure default port if none in .env

    const server = http.createServer(app);  // Create HTTP server
    const io = new SocketIOServer(server, {
    cors: {
        origin: "*",  // Allow connections from any origin
        methods: ["GET", "POST"],  // Allow both GET and POST requests
    },
    });

    // Middleware
    app.use(express.json(), cors());  // Parse JSON requests

    // Connect to the database
    dbConnect();

    // Routes
    app.use('/api', authRoutes, router, msgRouter);  // Authentication, Recipe, and Chat routes

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

    // Join a room based on user IDs
    socket.on('join_room', (room) => {
        if (room) {
        socket.join(room);
        console.log(`User ${socket.user.id} joined room ${room}`);
        } else {
        console.error("Room is undefined or empty.");
        }
    });

    // Handle incoming chat messages
    socket.on('chat_message', async (msgData) => {
        if (!msgData.message || !msgData.receiver_id || !msgData.room) {
        return console.error("Invalid message data: ", msgData);
        }
        console.log(`Message received from ${socket.user.id}: ${msgData.message}`);
        try {
        // Save the message to the database
        const newMessage = new Message({
            sender_id: socket.user.id,
            receiver_id: msgData.receiver_id,
            message: msgData.message,
        });
        // await newMessage.save();
        await console.log(newMessage);
        
        // Emit the message to the room
        io.to(msgData.room).emit('chat_message', {
            sender_id: socket.user.id,
            message: msgData.message,
            timestamp: newMessage.createdAt,
        });
        } catch (err) {
        console.error("Error saving message or emitting event:", err);
        }
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    });
    app.use('/uploads', express.static('public/uploads'));
    console.log(`you are On server side port: ${PORT}`);

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

    const upload = multer({ storage: storage });

    app.post('/api/upload', upload.single('sticker'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log(`File uploaded: ${req.file.filename}`);
    const filePath = req.file.path.replace('public/', '');
    res.status(200).send({ filePath });
});
    // Start the server
    server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });
