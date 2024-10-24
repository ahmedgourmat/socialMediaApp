const Chat = require('../models/Chat')
const Message = require('../models/Message')
const mongoose = require('mongoose')


const createMessage = async (req, res) => {
    const { chatId, content } = req.body;
    const sender = req.user._id;  // Use req.user._id to get the sender's ID

    try {
        // Create the new message
        const newMessage = await Message.create({ sender, content, chat: chatId });

        // Update the latestMessage field in the Chat model
        await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });

        // Populate the newly created message
        const populatedMessage = await Message.findById(newMessage._id)
            .populate('sender', '-password')
            .populate({
                path: 'chat',
                populate: {
                    path: 'users',
                    select: '-password',  // Exclude the password field from users
                },
            });

        console.log(populatedMessage);  // Debugging purpose to log the message

        // Send the populated message back as the response
        res.status(201).json(populatedMessage);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


const getMessages = async (req, res) => {
    const { chatId } = req.params;
    console.log(req.params)
    console.log('here is the chatId', chatId)

    // Validate chatId
    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ error: 'Invalid chatId' });
    }

    try {
        const messages = await Message.find({ chat: chatId })
            .populate('sender', '-password')
            .populate({
                path: 'chat',
                populate: {
                    path: 'users',
                    select: '-password',
                },
            });

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createMessage, getMessages }