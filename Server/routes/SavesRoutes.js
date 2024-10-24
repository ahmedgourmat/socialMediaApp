const savesRoutes = require('express').Router()
const{ createSave, getSaves, deleteSave , checkSaves } = require('../controllers/SavesControllers')
const authMiddleware = require('../middleware/authMiddleware')

savesRoutes.route('/').post(authMiddleware , createSave).get(authMiddleware , getSaves)
savesRoutes.route('/:saveId').delete(authMiddleware ,deleteSave)
savesRoutes.route('/:postId').get(authMiddleware , checkSaves)

module.exports = savesRoutes