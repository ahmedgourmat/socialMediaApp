const router = require('express').Router()
const {signup , login} = require('../controllers/UserControllers')
const Joi = require('joi')
const validateRequest = require('../middleware/joiValidation');


const signupSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required()
});


const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


router.route('/signup').post(validateRequest(signupSchema),signup)
router.route('/login').post(validateRequest(loginSchema),login)

module.exports = router