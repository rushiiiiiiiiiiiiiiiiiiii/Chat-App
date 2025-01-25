const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    id:String,
    sid:String,
    message:String
})

const chatModel = mongoose.model('chat', chatSchema)
module.exports = chatModel