const User = require("../models/User")
const createToken = require("../utils/createToken")
const hashingFun = require("../utils/hashThePassowrd")
const bcrypt = require('bcrypt')

const signup = async (req, res) => {

    const {
        name,
        email,
        password,
        confirmPassword
    } = req.body

    try {

        console.log('here')
        const existe = await User.findOne({ email })
        console.log('here')

        if (existe) {
            throw Error('This email already existe')
        }
        console.log('here')

        if(password !== confirmPassword){
            throw Error("The passwords aren't matching")
        }
        console.log('here')

        const hashPassword = await hashingFun(password)

        let user = await User.create({
            name,
            email,
            password: hashPassword,
        })
        console.log('here')


        const token = createToken(user._id)
        console.log('here')

        user = await User.findById(user._id).select('-password')

        res.status(201).json({ user, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}


const login = async (req, res) => {

    const {
        email,
        password
    } = req.body


    try {

        const existe = await User.findOne({ email })

        if (!existe) {
            throw Error('Invalid email or password')
        }

        const match = await bcrypt.compare(password, existe.password)

        if (!match) {
            throw Error('Invalid email or password')
        }

        const token = createToken(existe._id)

        const user = await User.findById(existe._id).select('-password')

        res.status(201).json({ user, token })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}

module.exports = {signup , login}