const mongoose = require('mongoose');

const profileViewSchema = new mongoose.Schema({
    viewedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    viewerUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    viewedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const ProfileView = mongoose.model('ProfileView', profileViewSchema);
module.exports = ProfileView;
