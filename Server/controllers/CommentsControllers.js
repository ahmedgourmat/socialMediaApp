const Comment = require('../models/Comments');
const Post = require('../models/Post');

const createComment = async (req, res) => {
    const { postId, text } = req.body;
    const userId = req.user;  // Get the current user's ID

    try {
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create a new comment
        const comment = await Comment.create({
            text,
            userC: userId,
            postC: postId
        });

        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        // Get comments for the specific post, populating the user information
        const comments = await Comment.find({ postC: postId })
            .populate('userC', 'name')  // Populate the user details
            .sort({ createdAt: -1 });  // Sort by latest first

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user;

    try {
        // Find the comment by ID
        const comment = await Comment.findById(commentId);

        // Check if the comment exists
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the logged-in user is the owner of the comment
        if (comment.userC.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this comment' });
        }

        // Update the comment's text
        comment.text = text;
        await comment.save();

        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user;

    try {
        // Find the comment by ID
        const comment = await Comment.findById(commentId);

        // Check if the comment exists
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the logged-in user is the owner of the comment
        if (comment.userC.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        // Delete the comment
        await comment.remove();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createComment, getComments, updateComment, deleteComment };
