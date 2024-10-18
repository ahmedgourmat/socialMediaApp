const messageRoutes = require('express').Router()
const {createMessage, getMessages} = require('../controllers/MessageControllers')
const authMiddleware = require('../middleware/authMiddleware')



messageRoutes.route('/').post(authMiddleware, createMessage).get(authMiddleware, getMessages)

module.exports = messageRoutes