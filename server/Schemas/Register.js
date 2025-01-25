const mongoose = require('mongoose')

const RegChatSchema = new mongoose.Schema({
    name: String,
    image: String,
    phone: Number,
    password: String
})

const RegModel = mongoose.model("regchat", RegChatSchema)
module.exports = RegModel