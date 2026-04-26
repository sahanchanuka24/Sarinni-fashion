import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/products');
        // Just take the first 4 for best sellers
        setFeaturedProducts(data.products.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="bg-premium-cream">
      <Hero />
      
      {/* Featured Collection Section */}
      <section className="py-32 container mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-premium-gold font-medium tracking-[0.4em] uppercase text-xs mb-6"
          >
            Curated For You
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-premium-black"
          >
            Best Sellers
          </motion.h2>
          <div className="w-16 h-[1px] bg-premium-gold mt-8 opacity-50"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-2 border-premium-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-24">
          <Link to="/collections">
            <button className="btn-outline">
              View All Sarongs
            </button>
          </Link>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-premium-black text-premium-cream py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <span className="text-premium-gold tracking-[0.3em] uppercase text-xs block mb-8">Artisanal Heritage</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-[1.2]">Beyond the <br />Coastal Tradition</h2>
            <p className="text-premium-cream/60 leading-relaxed mb-12 text-base md:text-lg font-light tracking-wide">
              Sarinni sarongs are more than just garments; they are pieces of art. Each thread is woven with stories of tropical breeze, ocean waves, and the skilled hands of our island artisans.
            </p>
            <button className="text-[10px] text-premium-cream border-b border-premium-gold pb-1 font-medium tracking-[0.2em] uppercase hover:text-premium-gold transition-colors">
              Discover Our Process
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=800" 
              alt="Artisan at work" 
              className="w-full h-[500px] md:h-[700px] object-cover filter brightness-75 hover:brightness-100 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-premium-gold/50 z-0 hidden md:block"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-r border-t border-premium-gold/50 z-0 hidden md:block"></div>
          </motion.div>
        </div>
      </section>

      {/* Collection Preview Section */}
      <section className="py-32 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="order-2 md:order-1 relative"
          >
            <div className="absolute inset-0 bg-premium-gold/5 translate-x-4 translate-y-4"></div>
            <img 
              src="/src/assets/sarong-preview.png" 
              alt="Batik Art" 
              className="w-full h-[500px] md:h-[650px] object-cover relative z-10"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="order-1 md:order-2 max-w-xl"
          >
            <span className="text-premium-black/40 tracking-[0.3em] uppercase text-xs block mb-8">Masterpiece</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-10 text-premium-black leading-[1.1]">The Batik <br /><span className="italic text-premium-gold font-light">Soul</span></h2>
            <p className="text-premium-black/60 leading-relaxed mb-12 text-base md:text-lg font-light tracking-wide">
              Our Batik collection is a tribute to the ancient art of wax-resist dyeing. Every pattern is unique, telling a story of patience, precision, and passion.
            </p>
            <Link to="/category/batik">
              <button className="btn-premium">Explore Batik</button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
