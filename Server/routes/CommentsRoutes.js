const commentsRoutes = require('express').Router()
const { createComment, getComments, updateComment, deleteComment } = require('../controllers/CommentsControllers')
const authMiddleware = require('../middleware/authMiddleware')

commentsRoutes.route('/').post(authMiddleware , createComment).get(authMiddleware , getComments)
commentsRoutes.route('/:commentId').patch(authMiddleware ,updateComment).delete(authMiddleware ,deleteComment)

module.exports = commentsRoutes