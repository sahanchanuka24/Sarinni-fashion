import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        // Simple client-side filtering for demonstration
        // In a real app, this would be a backend query like /api/products?category=Batik
        const filtered = data.products.filter(p => 
          p.category.toLowerCase() === category.toLowerCase() ||
          (category === 'resort' && p.category === 'Resort Wear')
        );
        setProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  const getTitle = () => {
    if (category === 'batik') return 'The Batik Collection';
    if (category === 'resort') return 'Resort Wear';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getDesc = () => {
    if (category === 'batik') return 'Intricate hand-dyed patterns using ancient wax-resist techniques.';
    if (category === 'resort') return 'Effortless elegance for your next sun-drenched getaway.';
    return `Discover our exclusive ${category} range.`;
  };

  return (
    <div className="pt-32 bg-premium-cream min-h-screen">
      <motion.div 
        key={category}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 mb-12"
      >
        <h1 className="text-5xl font-serif text-premium-black mb-4">{getTitle()}</h1>
        <p className="text-premium-black/60 max-w-2xl">{getDesc()}</p>
      </motion.div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-premium-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProductGrid 
          products={products} 
          title="Curated Pieces" 
          subtitle="Specialized Craft" 
        />
      )}
    </div>
  );
};

export default CategoryPage;
