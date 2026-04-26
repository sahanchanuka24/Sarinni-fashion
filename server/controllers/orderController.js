const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');
const { getOrderTemplate } = require('../utils/emailTemplate');

// Create new order => /api/orders/new
exports.newOrder = async (req, res) => {
  try {
    const { orderItems, shippingInfo, paymentInfo, itemsPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user: req.user ? req.user._id : undefined
    });

    // Send Order Confirmation Email asynchronously so it doesn't block the checkout
    try {
      const emailUser = req.user || { name: 'Valued Customer' };
      const emailHtml = getOrderTemplate(order, emailUser);
      
      sendEmail({
        email: shippingInfo.email,
        subject: `Order Confirmation - Sarinni #${order._id.toString().slice(-8).toUpperCase()}`,
        html: emailHtml
      }).catch(emailError => {
        console.error('Email could not be sent in background:', emailError.message);
      });
    } catch (err) {
      console.error('Error preparing email:', err.message);
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order => /api/orders/:id
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Only allow order owner or admin to view
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get logged in user orders => /api/orders/me
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all orders => /api/admin/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    res.status(200).json({ success: true, totalAmount, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update order status => /api/admin/orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.orderStatus === 'Delivered') {
      return res.status(400).json({ success: false, message: 'This order has already been delivered.' });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete order => /api/admin/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
