const express = require('express');
const router = express.Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Guests can create orders, but me/single order require auth
router.route('/orders/new').post(newOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/orders/:id').get(isAuthenticatedUser, getSingleOrder);

// Admin routes (Simplified for the new dashboard)
router.route('/admin/all-orders').get(getAllOrders);
router.route('/admin/orders/:id')
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
