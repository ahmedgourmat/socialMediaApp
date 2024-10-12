const jwt = require('jsonwebtoken')
require('dotenv').config()


const createToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET)
}

module.exports = createToken