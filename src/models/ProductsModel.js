const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    moq: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String, // Array of image URLs
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    ratings: {
        average: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        totalReviews: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
