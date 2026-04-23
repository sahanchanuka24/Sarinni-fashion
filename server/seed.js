const Product = require('./models/Product');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sarong-ecommerce');

const products = [
  {
    name: 'Midnight Batik Sarong',
    description: 'A masterpiece of traditional batik art, this silk sarong features hand-dyed indigo patterns with subtle gold accents. Perfect for formal evening resort wear.',
    price: 18500,
    category: 'Silk', // I'll update category enum in model later
    fabric: 'Pure Silk',
    color: 'Midnight Blue',
    images: [{ url: 'https://images.unsplash.com/photo-1605902711622-cfb43c443ffb?auto=format&fit=crop&q=80&w=600' }],
    stock: 10
  },
  {
    name: 'Coastal Handloom Sarong',
    description: 'Breathable and soft, this handloom cotton sarong is woven by artisans in coastal villages. Features a minimalist border design.',
    price: 6200,
    category: 'Cotton',
    fabric: 'Organic Handloom Cotton',
    color: 'Sand / Charcoal',
    images: [{ url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' }],
    stock: 15
  },
  {
    name: 'Royal Heritage Sarong',
    description: 'Reserved for special occasions, this premium sarong features intricate motifs inspired by royal courts. A true collector\'s piece.',
    price: 22000,
    category: 'Bridal', // Using Bridal as 'Premium/Occasion'
    fabric: 'Raw Silk',
    color: 'Royal Maroon',
    images: [{ url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=600' }],
    stock: 5
  },
  {
    name: 'Island Breeze Sarong',
    description: 'Lightweight and vibrant, this printed sarong is the ultimate companion for your tropical getaways.',
    price: 4500,
    category: 'Party Wear',
    fabric: 'Viscose',
    color: 'Ocean Teal',
    images: [{ url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600' }],
    stock: 20
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products deleted');

    await Product.insertMany(products);
    console.log('All products added');

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
