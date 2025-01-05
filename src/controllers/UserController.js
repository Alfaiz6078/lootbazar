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
            const { name, mobileno, address, pincode } = req.body;

            // Check if the mobile number already exists
            const existingUser = await User.findOne({ mobileno });
            if (existingUser) {
                return res.status(400).json({ message: "Mobile number already registered" });
            }

            const newUser = new User({
                name,
                mobileno,
                address,
                pincode
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

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { name, address, pincode },
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
