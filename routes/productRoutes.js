const express = require('express');
const router = express.Router();
const {deleteProductController,updateProductController,createProductController,getProductByIdController,getAllProductsController} = require('../controller/productController');

// Define product routes
router.get('/getAllProducts', getAllProductsController);
router.get('/getProduct/:id', getProductByIdController);
router.post('/addProduct', createProductController);
router.put('/updateProduct/:id',updateProductController);
router.delete('/deleteProduct/:id', deleteProductController);

module.exports = router;
