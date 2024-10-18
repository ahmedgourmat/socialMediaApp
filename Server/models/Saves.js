const mongoose = require('mongoose')

const SavesSchema = new mongoose.Schema({
    userS : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true
    },
    postS : {
        type : mongoose.Schema.Types.ObjectId ,
        ref: 'Post',
        required : true
    }
},{timestamps : true})


const Saves = mongoose.model('Saves' , SavesSchema)

module.exports = Saves