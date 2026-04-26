const express = require('express');
const router = express.Router();
const {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Public routes
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/reviews').get(getProductReviews);

// Protected routes (logged in user)
router.route('/review').post(isAuthenticatedUser, createProductReview);

// Admin routes
router.route('/admin/product/new').post(newProduct);
router.route('/admin/product/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
