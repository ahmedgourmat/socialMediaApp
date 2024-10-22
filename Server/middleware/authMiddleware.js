const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;


        if (!authorization) {
            throw new Error('Authorization header is missing');
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            throw new Error('Token is missing');
        }



        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (!decoded || !decoded.id) {
            throw new Error('Invalid token');
        }    

        const user = await User.findById(decoded.id).select('-password')


        if (!user) {
            throw new Error('user not found');
        }


        req.user = user._id
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = authMiddleware;