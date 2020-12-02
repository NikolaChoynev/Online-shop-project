const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: 'user'
    }],
    ownerId: {
        type: ObjectId,
        ref: 'user'
    },
    productId: {
        type: ObjectId,
        ref: 'product'
    }
}, { timestamps: { createdAt: 'created_at'} });

module.exports = mongoose.model('comment', commentSchema);