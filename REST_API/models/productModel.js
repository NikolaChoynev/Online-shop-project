const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description should be at least 10 characters']
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.startsWith("http://") || v.startsWith("https://");
            },
            message: props => `${props.value} must starts with http: or https: !`
        }
    },
    buyers: [{
        type: ObjectId,
        ref: 'user'
    }],
    ownerId: {
        type: ObjectId,
        ref: 'user'
    },
    comments: [{
        type: ObjectId,
        ref: 'comment'
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('product', productSchema);