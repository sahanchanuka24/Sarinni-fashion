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
    required: [true, 'Please enter product price']
  },
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: ['Insulated', 'Glass', 'Plastic', 'Adventure', 'Lifestyle'],
      message: 'Please select correct category'
    }
  },
  material: {
    type: String,
    required: [true, 'Please enter material type']
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
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
