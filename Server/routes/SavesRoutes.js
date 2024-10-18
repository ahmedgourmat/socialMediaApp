const savesRoutes = require('express').Router()
const{ createSave, getSaves, deleteSave } = require('../controllers/SavesControllers')
const authMiddleware = require('../middleware/authMiddleware')

savesRoutes.route('/').post(authMiddleware , createSave).get(authMiddleware , getSaves)
savesRoutes.route('/:saveId').delete(authMiddleware ,deleteSave)

module.exports = savesRoutes