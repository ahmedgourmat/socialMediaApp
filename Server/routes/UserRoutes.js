const router = require('express').Router()
const {signup , login , followUser} = require('../controllers/UserControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation');
const authMiddleware = require('../middleware/authMiddleware');


// const signupSchema = Joi.object().keys({
//     name: Joi.string().min(3).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required(),
//     confirmPassword: Joi.string().min(8).required()
// });


const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


router.route('/signup').post(signup)
router.route('/login').post(validateRequest(loginSchema),login)
router.route('/:otherUserId').patch(authMiddleware , followUser)

module.exports = router