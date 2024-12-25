import express from 'express';
import {
    getMessages,
    sendMessage,
    deleteMessage,
} from '../controllers/messageController.js';

const router = express.Router();

// Get messages between two users
router.get('/messages/:senderId/:receiverId', getMessages);

// Send a new message
router.post('/messages/:senderId/:receiverId', sendMessage);

// Delete a message by ID (optional)
router.delete('/messages/:messageId', deleteMessage);

export default router;
