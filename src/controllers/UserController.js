const User = require("../models/UserModel");

const UserController = {

    // Fetch all users
    index: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new user
    store: async (req, res) => {
        try {
            const { name, mobileno, otp, address, pincode } = req.body;
            
            // Capture the uploaded profile image path using multer
            const profileImage = req.file ? req.file.path.replace(/\\/g, '/') : null;
    
            const newUser = new User({
                name,
                mobileno,
                otp,
                address,
                pincode,
                profileImage
            });
    
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }    
    },

    // Fetch a single user by ID
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a user by ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, address, pincode } = req.body;
            
            // Check if a new profile image was uploaded
            const profileImage = req.file ? req.file.path.replace(/\\/g, '/') : null;
            
            const updateData = { name, address, pincode };
            
            // If a new image is provided, add it to the update data
            if (profileImage) {
                updateData.profileImage = profileImage;
            }
    
            const updatedUser = await User.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },    

    // Delete a user by ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = UserController;
