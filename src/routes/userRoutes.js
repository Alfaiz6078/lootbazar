const express = require('express');
const router = express.Router();
const upload = require('../Helper/multerConfig');

const userController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const StatusController = require('../controllers/StatusController');

//user routes
router.get('/user/index', userController.index);
router.post('/register', userController.store);
router.get('/profile/:id/edit', userController.edit);
router.put('/profile/:id/update', userController.update);
router.delete('/profile/:id/delete', userController.delete);

//product routes
router.get('/products', ProductController.index);
router.post('/products/store', upload.array('images', 5), ProductController.store);
router.get('/products/:id/edit', ProductController.edit);
router.put('/products/:id/update', ProductController.update);   
router.delete('/products/:id/delete-image', ProductController.deleteImage);
router.delete('/products/:id/delete', ProductController.delete);

//Category routes
router.get('/categories', CategoryController.index);
router.post('/categories/store', upload.single('image'),CategoryController.store);
router.get('/categories/:id/edit', CategoryController.edit);
router.put('/categories/:id/update', CategoryController.update);
router.delete('/categories/:id/delete', CategoryController.delete);


//status routes
router.post('/status/store', upload.single('media'), StatusController.store);
router.get('/status', StatusController.index);
router.delete('/status/:id', StatusController.deleteStatus);


module.exports = router;