const chatRoutes = require('express').Router()
const { createChat, getChats, updateChat, deleteChat } = require('../controllers/ChatControllers')
const authMiddleware = require('../middleware/authMiddleware')



chatRoutes.route('/').post(authMiddleware, createChat).get(authMiddleware, getChats)
chatRoutes.route('/:chatId').delete(authMiddleware, deleteChat).patch(authMiddleware, updateChat)

module.exports = chatRoutes