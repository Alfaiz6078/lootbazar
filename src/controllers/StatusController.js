const Status = require('../models/StatusModel');
const fs = require('fs');
const path = require('path');

// Create a new status with a video
const store = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const video = req.file.path; // Using multer to get the uploaded file

        const newStatus = new Status({
            userId,
            productId,
            video
        });

        const savedStatus = await newStatus.save();
        res.status(201).json(savedStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch all active statuses
const index = async (req, res) => {
    try {
        const statuses = await Status.find().populate('userId');
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a status (User deletes manually)
const deleteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.findById(id);
        if (!status) {
            return res.status(404).json({ message: "Status not found" });
        }

        // Delete the video file from the server
        fs.unlinkSync(status.video);

        await Status.findByIdAndDelete(id);
        res.status(200).json({ message: "Status deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { store, index, deleteStatus };
