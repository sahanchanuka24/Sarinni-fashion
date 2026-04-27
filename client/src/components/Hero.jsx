import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full bg-[#0F0F0F] overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/minimal-hero.jpg"
          alt="Sarinni Collection"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Simple Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end pb-16 sm:pb-24 px-6 lg:px-16" style={{ minHeight: '100svh' }}>
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-white/50 mb-5"
          >
            The Core Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-light text-white leading-[1.05] mb-4 tracking-tight uppercase"
          >
            Sarinni
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mb-10 font-light"
          >
            Elevated everyday wear. Premium sarongs crafted for the modern man, focusing on exceptional fabrics and timeless design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href="#shop" className="btn-primary text-center">
              Shop Collection
            </a>
            <a href="#about" className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white text-[11px] font-semibold uppercase tracking-[0.15em] hover:bg-white/10 transition-all duration-200">
              Our Story
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
