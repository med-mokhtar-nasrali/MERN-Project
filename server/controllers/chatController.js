    import Message from '../models/message.model.js';

    // Get all messages between two users
    export const getMessages = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        // Fetch messages between sender and receiver
        const messages = await Message.find({
        $or: [
            { sender_id: senderId, receiver_id: receiverId },
            { sender_id: receiverId, receiver_id: senderId },
        ],
        })
        .populate('sender_id', 'username') // Populate sender's username
        .populate('receiver_id', 'username') // Populate receiver's username
        .sort({ createdAt: 'asc' }); // Sort messages by timestamp

        if (!messages) {
        return res.status(404).json({ message: 'No messages found.' });
        }

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    };

    // Send a new message
    export const sendMessage = async (req, res) => {
    const { senderId, receiverId } = req.params;
    const { message } = req.body;
    

    try {
        // Create a new message
        const newMessage = new Message({
        sender_id: senderId,
        receiver_id: receiverId,
        message: message,
        }) ;

        // Save the message to the database
        await newMessage.save();

        // Send a success response with the new message
        return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    };

    // Example of a route for deleting a message 
    export const deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    try {
        // Find and delete the message
        const message = await Message.findByIdAndDelete(messageId);

        if (!message) {
        return res.status(404).json({ message: 'Message not found' });
        }

        return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    };
