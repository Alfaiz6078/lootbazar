const User = require('../models/UserModel');
const ProfileView = require('../models/ProfileModel');

const ProfileController = {

viewProfileuser : async (req, res) => {
    try {
        const { viewedUserId } = req.params;
        const { viewerUserId } = req.body;

        // Prevent self-view
        if (viewedUserId === viewerUserId) {
            return res.status(200).json({ message: "Profile viewed, but not stored as it's the same user." });
        }
        // Check if both users exist
        const viewedUser = await User.findById(viewedUserId);
        const viewerUser = await User.findById(viewerUserId);

        if (!viewedUser || !viewerUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Save the view in the database
        const profileView = new ProfileView({ viewedUserId, viewerUserId });
        await profileView.save();

        res.status(200).json({ message: "Profile viewed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},
    viewProfilelist: async (req, res) => {
        try {
            const { viewedUserId } = req.params;
    
            // Fetch all viewers of a specific user
            const profileViews = await ProfileView.find({ viewedUserId })
                .populate('viewerUserId', 'name profileImage') // Populate viewer details
                .sort({ viewedAt: -1 }); // Sort by latest view first
    
            if (profileViews.length === 0) {
                return res.status(404).json({ message: "No views found for this user." });
            }
    
            res.status(200).json({ views: profileViews });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    }
};

module.exports = ProfileController;