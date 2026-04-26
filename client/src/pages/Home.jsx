import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data.products || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derive unique categories from products
  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [products]);

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <main className="bg-white">
      <Hero />
      
      {/* The Shop Section */}
      <section id="shop" className="py-24 container mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-sans font-semibold tracking-tight text-premium-black"
          >
            The Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-premium-black/50 text-sm max-w-md mx-auto"
          >
            Explore our meticulously crafted sarongs, blending traditional artistry with modern resort wear.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        {!loading && categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-premium-black text-white shadow-md'
                    : 'bg-gray-100 text-premium-black/60 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Product Count */}
        {!loading && (
          <p className="text-center text-xs text-premium-black/40 mb-10 tracking-wide uppercase font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-premium-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 4) * 0.08, duration: 0.4, ease: "easeOut" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-premium-black/40">
            <p className="text-lg">No products in this category yet.</p>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-premium-rose">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-8 text-premium-black tracking-tight">
              Minimalist Luxury
            </h2>
            <p className="text-premium-black/70 leading-relaxed md:text-lg mb-8 font-light">
              Sarinni is born from the desire to simplify resort wear. We strip away the unnecessary, focusing entirely on premium fabrics, clean lines, and ultimate comfort. Our sarongs are designed to be effortless—whether you're by the pool or at a seaside dinner.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
