const Chat = require('../models/Chat')
const User = require('../models/User')

const createChat = async (req, res) => {
    const sender = req.user;
    const { recieverId } = req.body;

    try {

        let existingChat = await Chat.findOne({ users: { $all: [sender._id, recieverId] } });

        if (existingChat) {
            return res.status(400).json({ message: 'Chat already exists' });
        }

        const chat = await Chat.create({ users: [sender._id, recieverId] });

        res.status(201).json({ message: 'Chat created successfully', chat });
    } catch (error) {
        console.log('chat Error', error)
        res.status(500).json({ error: error.message });
    }
}



const getChats = async (req, res) => {
    const userId = req.user;

    try {

        const chats = await Chat.find({ users: userId })
            .populate('users', '-password')
            .populate({
                path: 'latestMessage',
                populate: {
                    path: 'sender', // This will populate the sender field inside latestMessage
                    select: '-password', // You can select specific fields like name and email
                },
            })
            .sort({ updatedAt: -1 });


        // const formattedChats = chats.map(chat => {
        //     const otherUser = chat.users.find(user => !user._id.equals(userId));
        //     return {
        //         _id: chat._id,
        //         chatName: otherUser.name,
        //         latestMessage: chat.latestMessage,
        //         users: chat.users,
        //         createdAt: chat.createdAt,
        //         updatedAt: chat.updatedAt
        //     };
        // });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateChat = async (req, res) => {
    const { chatId } = req.params;
    const { chatName } = req.body;  // We're updating the chatName

    try {
        // Find and update the chatName for the specified chat
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatName },  // Update the chatName with the new value
            { new: true }  // Return the updated document
        )
            .populate('users', 'name')
            .populate('latestMessage');

        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json(updatedChat);  // Send back the updated chat
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const deleteChat = async (req, res) => {
    const { chatId } = req.params;

    try {
        const deletedChat = await Chat.findByIdAndDelete(chatId);

        if (!deletedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}





module.exports = { createChat, getChats, updateChat, deleteChat }