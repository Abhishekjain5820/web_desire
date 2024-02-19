const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Get all orders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get order by ID
const getOrderByIdController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new order
const createOrderController = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Extract products from the cart
    const products = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Calculate total price
    const totalPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    // Create a new order
    const order = new Order({
      user: userId,
      products,
      totalPrice,
      status: "pending",
    });

    // Save the order to the database
    await order.save();

    // Clear the user's cart after placing the order
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Update an order
const updateOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    const { status } = req.body;
    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    // Update the order status
    order.status = status;
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete an order
const deleteOrderController = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  deleteOrderController,
  updateOrderController,
  createOrderController,
  getOrderByIdController,
  getAllOrdersController,
};
