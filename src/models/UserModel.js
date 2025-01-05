const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    mobileno: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/, // Ensures a valid 10-digit mobile number
    },
    otp: {
        type: String,
    },
    address: {
        type: String,
    },
    pincode: {
        type: String,
        match: /^[0-9]{6}$/, // Ensures a valid 6-digit pincode
    },
}, { timestamps: true });

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
