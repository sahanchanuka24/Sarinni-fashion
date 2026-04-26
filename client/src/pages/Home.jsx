import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="bg-white">
      <Hero />
      
      {/* The Shop Section */}
      <section id="shop" className="py-24 container mx-auto px-6 lg:px-10 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center mb-20 text-center">
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

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-premium-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index % 4) * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
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
