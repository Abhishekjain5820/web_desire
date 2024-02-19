const Product = require('../models/Product');


  // Get all products
  const getAllProductsController=async(req,res)=>{
    try {
      const products = await Product.find();
      res.json({success:true,products});
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({success:false, message: 'Server error' });
    }
  }

  // Get product by ID
  const getProductByIdController=async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({success:false, message: 'Product not found' });
      }
      res.json({success:true,product});
    } catch (error) {
      console.error('Error getting product by ID:', error);
      res.status(500).json({ success:false,message: 'Server error' });
    }
  }

  // Create a new product
  const createProductController=async (req, res)=> {
    try {
      const newProduct = new Product(req.body);
      console.log(newProduct)
      await newProduct.save();
      res.status(201).json({success:true,newProduct});
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({success:false, message: 'Server error' });
    }
  }

  // Update a product
  const updateProductController= async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({success:false, message: 'Product not found' });
      }
      res.json({success:true,updatedProduct});
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ success:false,message: 'Server error' });
    }
  }

  // Delete a product
  const deleteProductController=async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({success:false, message: 'Product not found' });
      }
      res.json({success:true, message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({success:false, message: 'Server error' });
    }
  }

module.exports = {deleteProductController,updateProductController,createProductController,getProductByIdController,getAllProductsController};
