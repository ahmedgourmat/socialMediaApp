const Saves = require('../models/Saves');
const Post = require('../models/Post');

const createSave = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user; // Get the current user's ID

    try {
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the save already exists
        const existingSave = await Saves.findOne({ userS: userId, postS: postId });
        if (existingSave) {
            return res.status(400).json({ message: 'Post already saved' });
        }

        // Create a new save
        const save = await Saves.create({
            userS: userId,
            postS: postId
        });

        res.status(201).json({ message: 'Post saved successfully', save });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getSaves = async (req, res) => {
    const userId = req.user; // Get the current user's ID

    try {
        // Get saves for the specific user and populate post details
        const saves = await Saves.find({ userS: userId })
            .populate('userS')
            .populate({
                path : 'postS',
                populate : {
                    path : 'userP' , 
                    select : '-password'
                }
            }) // Populate the post details
            .sort({ createdAt: -1 }); // Sort by latest first

        res.status(200).json(saves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const checkSaves = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user;

    try {
        // Check if the post is already saved by the user
        const existingSave = await Saves.findOne({ userS: userId, postS: postId });

        if (existingSave) {
            return res.status(200).json({ saved: true, message: 'Post is already saved' });
        }

        res.status(200).json({ saved: false, message: 'Post is not saved' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const deleteSave = async (req, res) => {
    const { saveId } = req.params;
    const userId = req.user;

    try {
        // Find the save by ID
        const save = await Saves.findById(saveId);

        // Check if the save exists
        if (!save) {
            return res.status(404).json({ message: 'Save not found' });
        }

        // Check if the logged-in user is the owner of the save
        if (save.userS.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this save' });
        }

        // Delete the save
        await save.remove();

        res.status(200).json({ message: 'Post save removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSave, getSaves, deleteSave, checkSaves };
