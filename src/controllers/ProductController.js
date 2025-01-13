const Product = require("../models/ProductsModel");
const User = require("../models/UserModel");

const ProductController = {

    // Fetch all products
    index: async (req, res) => {
        try {
            // Get page number and limit from query params, default to page 1 and 10 products per page
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            
            // Calculate the number of documents to skip
            const skip = (page - 1) * limit;
    
            // Fetch products with pagination applied
            const products = await Product.find().skip(skip).limit(limit);
            
            // Count total products for pagination metadata
            const totalProducts = await Product.countDocuments();
    
            res.status(200).json({
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                products
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },    

    // Add a new product
    store: async (req, res) => {
        try {
            const { title, description, price, stock,moq, category, userId, location, phoneNumber } = req.body;
             // Check if userId exists in the database
            const userExists = await User.findById(userId);
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }

            // Capture image file paths
            const images = req.files.map(file => file.path); 

            const newProduct = new Product({
                title,
                description,
                price,
                stock,
                moq,
                images,
                category,
                userId,
                location,
                phoneNumber
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
            const { title, description, price, stock, moq, category, userId, location, phoneNumber } = req.body;
    
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            // Keep existing images and add new ones if uploaded
            const newImages = req.files.map(file => file.path);
            const allImages = [...product.images, ...newImages];
    
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { name, description, price, stock, moq, images: allImages, category, userId, location, phoneNumber },
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

    listBycategoryId: async (req, res) => {
        try {
            const { categoryId } = req.params;
    
            // Find all products with the provided category ID
            const products = await Product.find({ category: categoryId }).populate('category');
    
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found for this category." });
            }
    
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    searchProduct: async (req, res) => {
        try {
            const { title } = req.query; // Get title from query parameter
    
            if (!title) {
                return res.status(400).json({ error: "Please provide a product title to search." });
            }
    
            // Case-insensitive search using a regular expression
            const products = await Product.find({
                title: { $regex: new RegExp(title, "i") }
            });
    
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found with that title." });
            }
    
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listByuserId: async (req, res) => {
        try {
            const { userId } = req.params;
    
            // Find all products with the provided category ID
            const products = await Product.find({ userId: userId }).populate('userId');
    
            if (products.length === 0) {
                return res.status(404).json({ message: "No products found for this user." });
            }
    
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    produtsDetails: async (req, res) => {
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
    }
};

module.exports = ProductController;
