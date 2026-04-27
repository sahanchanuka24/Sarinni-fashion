import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full bg-gray-50 pt-16" style={{ minHeight: '80svh' }}>
      <div className="absolute inset-0 z-0">
        <img
          src="/minimal-hero.jpg"
          alt="Sarinni New Collection"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Soft elegant gradient instead of heavy dark fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
      </div>

      <div className="relative z-20 flex flex-col justify-center h-full px-6 lg:px-16" style={{ minHeight: 'calc(80svh - 64px)' }}>
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4"
          >
            New Arrivals
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light text-black leading-[1.1] mb-6 tracking-tight"
          >
            Redefining<br />Everyday Luxury.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md mb-10 font-light"
          >
            Discover our latest collection of premium men's sarongs. Crafted from exceptional fabrics with meticulous attention to detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#shop" className="btn-primary shadow-lg shadow-black/10 hover:shadow-black/20 text-center">
              Shop Men
            </a>
            <a href="#about" className="btn-ghost text-center bg-white/50 backdrop-blur-sm">
              Discover Our Story
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
