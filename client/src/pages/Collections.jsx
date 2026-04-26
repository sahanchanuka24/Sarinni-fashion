import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="pt-32 bg-premium-cream min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-6 mb-12"
      >
        <h1 className="text-5xl font-serif text-premium-black mb-4">All Collections</h1>
        <p className="text-premium-black/60 max-w-2xl">
          Explore our entire range of handcrafted sarongs, from traditional batik to modern resort wear.
        </p>
      </motion.div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-premium-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProductGrid 
          products={products} 
          title="Full Catalog" 
          subtitle="Handpicked Excellence" 
        />
      )}
    </div>
  );
};

export default Collections;
