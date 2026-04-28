const Product = require('./models/Product');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sarong-ecommerce');

const products = [
  {
    name: 'Cactus Love Insulated Bottle - Sunshine Yellow',
    description: 'Brighten your day with this vibrant sunshine yellow bottle. Features a matte finish, premium "Cactus LOVE" illustration, and a durable carry strap. Price: 650 LKR (+ 450 LKR delivery).',
    price: 650,
    category: 'Insulated',
    material: 'Matte Stainless Steel',
    color: 'Sunshine Yellow',
    images: [{ url: '/products/cactus-yellow.jpg' }],
    stock: 50
  },
  {
    name: 'Cactus Love Insulated Bottle - Arctic White',
    description: 'A crisp, clean Arctic White bottle with a refreshing succulent design. High-performance insulation keeps your drinks ice-cold for hours. Price: 650 LKR (+ 450 LKR delivery).',
    price: 650,
    category: 'Insulated',
    material: 'Matte Stainless Steel',
    color: 'Arctic White',
    images: [{ url: '/products/cactus-white.jpg' }],
    stock: 50
  },
  {
    name: 'Flipora Pro Adventure - Ocean Blue',
    description: 'The ultimate adventure companion. Rugged, double-walled vacuum insulation for extreme durability.',
    price: 1200,
    category: 'Adventure',
    material: 'High-Grade 316 Stainless Steel',
    color: 'Ocean Blue',
    images: [{ url: 'https://images.unsplash.com/photo-1602143352538-396055449abc?auto=format&fit=crop&q=80&w=600' }],
    stock: 25
  },
  {
    name: 'Flipora Lite - Charcoal Grey',
    description: 'Ultra-lightweight and minimalist. Perfect for the gym or daily commute.',
    price: 850,
    category: 'Lifestyle',
    material: 'Lightweight Alloy',
    color: 'Charcoal Grey',
    images: [{ url: 'https://images.unsplash.com/photo-1523362628744-0c142c9ffb7c?auto=format&fit=crop&q=80&w=600' }],
    stock: 40
  },
  {
    name: 'Flipora Pure Glass - Frosted Teal',
    description: 'Taste purity with our frosted glass collection. Eco-friendly and elegant.',
    price: 1500,
    category: 'Glass',
    material: 'Borosilicate Glass',
    color: 'Frosted Teal',
    images: [{ url: 'https://images.unsplash.com/photo-1544441892-0b73c387b322?auto=format&fit=crop&q=80&w=600' }],
    stock: 15
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Old products deleted');

    await Product.insertMany(products);
    console.log('Flipora hydration collection seeded successfully');

    process.exit();
  } catch (error) {
    console.log('Seeding error:', error.message);
    process.exit();
  }
};

seedProducts();
