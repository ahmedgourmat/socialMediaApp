const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String , 
        required : true
    },
    password : {
        type : String,
        required : true
    },
    bio : {
        type : String , 
        default : ''
    },
    img : String ,
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
},{timestamps : true})



const User = mongoose.model('User' , UserSchema)

module.exports = User