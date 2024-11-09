const Post = require('../models/Post')
const cloudinary = require('../config/Cloudinary')

const createPost = async (req, res) => {
    const { img } = req.body; // This should be the base64 image string
    const userId = req.user;

    try {

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(img, {
            folder: 'posts', // Optional: specify a folder
        });

        // Create the post with the image URL
        await Post.create({ userP: userId, img: result.secure_url });
        console.log('here')

        res.status(201).json({ message: 'Post has been created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getPosts = async (req, res) => {
    const { userId } = req.query;  // Use req.query for GET requests
    const query = {};

    // If userId is provided, filter posts by that user
    if (userId) {
        query['userP'] = userId;
    }

    try {
        // Fetch posts based on query and populate the user data
        const posts = await Post.find(query)
            .populate('userP', '-passowrd')  // Populate user fields from the User model
            .sort({ createdAt: -1 });  // Sort posts by newest first

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const likePost = async (req, res) => {
    const { postId } = req.params;  // Get postId from the request parameters

    try {
        console.log('here')
        // Find the post by its ID and increment the 'likes' field by 1
        const post = await Post.findByIdAndUpdate(
            postId,
            { $inc: { likes: 1 } },  // Increment the likes count
            { new: true }  // Return the updated post
        );

        // If the post is not found
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post liked successfully', post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deletePost = async (req, res) => {
    const { postId } = req.params;  // Get the postId from the request parameters
    const userId = req.user;  // Get the user ID of the currently logged-in user

    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        // If post is not found, return 404
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the owner of the post or an admin (you can customize the admin check)
        if (post.userP.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        // Delete the post
        await post.remove();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createPost, getPosts, likePost, deletePost }