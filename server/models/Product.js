const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [8, 'Price cannot exceed 8 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: ['Silk', 'Cotton', 'Batik', 'Handloom', 'Premium', 'Resort Wear'],
      message: 'Please select correct category'
    }
  },
  fabric: {
    type: String,
    required: [true, 'Please enter fabric type']
  },
  color: {
    type: String,
    required: [true, 'Please enter color']
  },
  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    default: 1
  },
  ratings: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
