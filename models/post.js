const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

module.exports = mongoose.model("Post", postSchema);