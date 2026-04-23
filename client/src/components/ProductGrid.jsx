import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductGrid = ({ products, title, subtitle }) => {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="flex flex-col items-center mb-16 text-center">
        {subtitle && (
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-premium-gold font-medium tracking-[0.3em] uppercase mb-4"
          >
            {subtitle}
          </motion.span>
        )}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-premium-black"
        >
          {title}
        </motion.h2>
        <div className="w-20 h-[2px] bg-premium-gold mt-6"></div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
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
      ) : (
        <div className="text-center py-20">
          <p className="text-premium-black/50 font-serif text-xl">No products found in this collection.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
