const Product = require("../models/ProductsModel");

const ProductController = {

    // Fetch all products
    index: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add a new product
    store: async (req, res) => {
        try {
            const { name, description, price, stock,moq, category, isActive } = req.body;
            
            // Capture image file paths
            const images = req.files.map(file => file.path); 

            const newProduct = new Product({
                name,
                description,
                price,
                stock,
                moq,
                images,
                category,
                isActive: isActive ?? true
            });
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Fetch a single product by ID
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a product by ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, stock, moq, category, isActive } = req.body;
    
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            // Keep existing images and add new ones if uploaded
            const newImages = req.files.map(file => file.path);
            const allImages = [...product.images, ...newImages];
    
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, description, price, stock, moq, images: allImages, category, isActive },
                { new: true, runValidators: true }
            );
    
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteImage : async (req, res) => {
        try {
            const { id } = req.params;
            const { imagePath } = req.body;
    
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            // Filter out the image to delete
            const updatedImages = product.images.filter(image => image !== imagePath);
    
            // Delete the image from server
            if (product.images.includes(imagePath)) {
                fs.unlinkSync(imagePath);
            }
    
            // Update the product with the remaining images
            product.images = updatedImages;
            await product.save();
    
            res.status(200).json({ message: "Image deleted successfully", product });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a product by ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ProductController;
