const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({

    users : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    latestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
    },
    chatName: {
        type: String,
        default: "",
    }

},{
    timestamps : true
})


const Chat = mongoose.model("Chat" , ChatSchema)


module.exports = Chat