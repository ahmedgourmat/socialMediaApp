const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

    userP: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    img: {
        type: String
    },
    likes: {
        type: Number,
        default : 0
    }
}, {
    timestamps: true
})



const Post = mongoose.model("Post", PostSchema)


module.exports = Post