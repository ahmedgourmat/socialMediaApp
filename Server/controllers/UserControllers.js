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

        if (password !== confirmPassword) {
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

const followUser = async (req, res) => {
    const userId = req.user;  // The person who is following
    const { otherUserId } = req.params;  // The user to be followed

    try {
        // Ensure the user is not trying to follow themselves
        if (userId === otherUserId) {
            throw new Error('You cannot follow yourself');
        }

        // Find both users
        const user = await User.findById(userId);
        const otherUser = await User.findById(otherUserId);

        if (!user || !otherUser) {
            throw new Error('User not found');
        }

        // Check if the user is already following the other user
        if (user.following.includes(otherUserId)) {
            throw new Error('You are already following this user');
        }

        // Add otherUserId to the user's following list
        user.following.push(otherUserId);
        await user.save();

        // Add userId to the other user's followers list
        otherUser.followers.push(userId);
        await otherUser.save();

        res.status(200).json({ message: 'Followed successfully', user, otherUser });
    } catch (error) {
        console.log('Follow Error',error)
        res.status(500).json({ error: error.message });
    }
};

const unfollowUser = async (req, res) => {
    const userId = req._id;  // The person who is unfollowing
    const { otherUserId } = req.body;  // The user to be unfollowed

    try {
        // Ensure the user is not trying to unfollow themselves
        if (userId === otherUserId) {
            throw new Error('You cannot unfollow yourself');
        }

        // Find both users
        const user = await User.findById(userId);
        const otherUser = await User.findById(otherUserId);

        if (!user || !otherUser) {
            throw new Error('User not found');
        }

        // Check if the user is not following the other user
        if (!user.following.includes(otherUserId)) {
            throw new Error('You are not following this user');
        }

        // Remove otherUserId from the user's following list
        user.following = user.following.filter(followingId => followingId.toString() !== otherUserId);
        await user.save();

        // Remove userId from the other user's followers list
        otherUser.followers = otherUser.followers.filter(followerId => followerId.toString() !== userId);
        await otherUser.save();

        res.status(200).json({ message: 'Unfollowed successfully', user, otherUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { signup, login, followUser, unfollowUser}