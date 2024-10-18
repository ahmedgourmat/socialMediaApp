const Message = require('../models/Message')


const createMessage = async (req, res) => {
    const { chatId, content } = req.body
    const sender = req.user

    try {

        const newMessage = await Message.create({ sender, content, chat: chatId })

        await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });

        res.status(201).json({ message: 'Message created successfully' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}


const getMessages = async (req, res) => {

    const { chatId } = req.body

    try {

        const messages = await Message.find({ chat: chatId })
            .populate('sender', '-password')
            .populate({
                path: 'chat',
                populate: {
                    path: 'users',
                    select: '-passowrd'
                },
            });


        res.status(200).json(messages)


    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

module.exports = { createMessage, getMessages }