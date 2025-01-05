const Category = require("../models/CategoryModel");

const CategoryController = {

    // Fetch all categories
    index: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add a new category
    store: async (req, res) => {
        try {
            const { name, description, isActive } = req.body;
    
            // Capture the uploaded image path from multer
            const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;
    
            const newCategory = new Category({
                name,
                description,
                image: imagePath,  // Save image path in the database
                isActive: isActive ?? true
            });
    
            const savedCategory = await newCategory.save();
            res.status(201).json(savedCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },    

    // Fetch a single category by ID
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a category by ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, image, isActive } = req.body;
            const updatedCategory = await Category.findByIdAndUpdate(
                id,
                { name, description, image, isActive },
                { new: true, runValidators: true }
            );
            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a category by ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCategory = await Category.findByIdAndDelete(id);
            if (!deletedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = CategoryController;
