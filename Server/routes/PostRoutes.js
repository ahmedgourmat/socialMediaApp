const postRoutes = require('express').Router()
const { createPost, getPosts, likePost, deletePost } = require('../controllers/PostControllers')
const authMiddleware = require('../middleware/authMiddleware')

postRoutes.route('/').post(authMiddleware, createPost).get(authMiddleware, getPosts)
postRoutes.route('/:postId').patch(authMiddleware , likePost).delete(authMiddleware ,deletePost)

module.exports = postRoutes