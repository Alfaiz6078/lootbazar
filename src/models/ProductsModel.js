const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',                      
        required: true
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
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
    location: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    images: [{
        type: String, // Array of image URLs
    }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
