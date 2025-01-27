import express from 'express';
import {
    getMessages,
    sendMessage,
    deleteMessage,
    getConversations,
} from '../controllers/chatController.js';

const msgRouter = express.Router();
//get converstions
msgRouter.get('/messages/:userId', getConversations);
// Get messages between two users
msgRouter.get('/messages/:senderId/:receiverId', getMessages);

// Send a new message
msgRouter.post('/messages/:senderId/:receiverId', sendMessage);

// Delete a message by ID (optional)
msgRouter.delete('/messages/:messageId', deleteMessage);

export default msgRouter;
