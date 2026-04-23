import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  // Mock products for UI demonstration
  const featuredProducts = [
    {
      _id: '1',
      name: 'Midnight Batik Sarong',
      price: 18500,
      category: 'Batik',
      images: [{ url: 'https://images.unsplash.com/photo-1605902711622-cfb43c443ffb?auto=format&fit=crop&q=80&w=600' }]
    },
    {
      _id: '2',
      name: 'Coastal Handloom',
      price: 6200,
      category: 'Handloom',
      images: [{ url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' }]
    },
    {
      _id: '3',
      name: 'Royal Heritage',
      price: 22000,
      category: 'Premium',
      images: [{ url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=600' }]
    },
    {
      _id: '4',
      name: 'Island Breeze',
      price: 4500,
      category: 'Resort Wear',
      images: [{ url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600' }]
    }
  ];

  return (
    <main className="bg-premium-cream">
      <Hero />
      
      {/* Featured Collection Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-premium-gold font-medium tracking-[0.3em] uppercase mb-4"
          >
            Curated For You
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-premium-black"
          >
            Best Sellers
          </motion.h2>
          <div className="w-20 h-[2px] bg-premium-gold mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="px-10 py-4 border border-premium-black text-premium-black hover:bg-premium-black hover:text-premium-cream transition-all duration-300 font-medium tracking-widest uppercase text-sm">
            View All Sarongs
          </button>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-premium-black text-premium-cream py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-premium-gold tracking-[0.3em] uppercase block mb-6">Artisanal Heritage</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight">Beyond the <br />Coastal Tradition</h2>
            <p className="text-premium-cream/70 leading-relaxed mb-8 text-lg">
              Sarinni sarongs are more than just garments; they are pieces of art. Each thread is woven with stories of tropical breeze, ocean waves, and the skilled hands of our island artisans.
            </p>
            <button className="text-premium-gold border-b border-premium-gold pb-1 font-medium tracking-widest hover:text-premium-cream hover:border-premium-cream transition-all">
              DISCOVER OUR PROCESS
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=800" 
              alt="Artisan at work" 
              className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border-2 border-premium-gold z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* Collection Preview Section */}
      <section className="py-24 bg-premium-rose/20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <img 
              src="/src/assets/sarong-preview.png" 
              alt="Batik Art" 
              className="w-full h-[500px] object-cover shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <span className="text-premium-gold tracking-[0.3em] uppercase block mb-6">Masterpiece</span>
            <h2 className="text-5xl font-serif mb-8">The Batik Soul</h2>
            <p className="text-premium-black/70 leading-relaxed mb-8 text-lg">
              Our Batik collection is a tribute to the ancient art of wax-resist dyeing. Every pattern is unique, telling a story of patience, precision, and passion.
            </p>
            <button className="btn-premium">EXPLORE BATIK</button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
