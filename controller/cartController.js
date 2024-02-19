const Cart = require('../models/Cart');

// Get cart by user ID
const getCartByUserIdController = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


// Add item to cart
const addToCartController = async (req, res) => {
    try {
      const { userId, productId, quantity, price } = req.body;
  
      // Check if the user already has a cart
      let cart = await Cart.findOne({ user: userId });
  
      // If user does not have a cart, create a new one
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      // Check if the product already exists in the cart
      const existingProductIndex = cart.items.findIndex(item => item.product.toString() === productId);
  
      if (existingProductIndex !== -1) {
        // If product already exists, update the quantity
        cart.items[existingProductIndex].quantity += quantity;
      } else {
        // If product does not exist, add it to the cart
        cart.items.push({ product: productId, quantity, price });
      }
  
      // Save/update the cart in the database
      await cart.save();
  
      res.status(201).json({ success: true, cart });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
  

// Update cart item
const updateCartItemController = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    // If cart does not exist, return error
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Find the cart item by product ID
    const cartItem = cart.items.find(item => item.product.toString() === productId);

    // If cart item does not exist, return error
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    // Update the quantity of the cart item
    cartItem.quantity = quantity;

    // Save/update the cart in the database
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Remove item from cart
const removeFromCartController = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    // If cart does not exist, return error
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Find the index of the cart item by product ID
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    // If cart item does not exist, return error
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    // Remove the cart item from the array
    cart.items.splice(itemIndex, 1);

    // Save/update the cart in the database
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  removeFromCartController,
  updateCartItemController,
  addToCartController,
  getCartByUserIdController
};