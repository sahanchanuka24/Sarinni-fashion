import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-white overflow-hidden">
      {/* Background Image - Clean minimalist fashion aesthetic */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop" 
            alt="Premium Minimalist Fashion" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
        {/* Soft overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent sm:bg-gradient-to-r sm:from-white/90 sm:via-white/50 sm:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center sm:justify-center items-center sm:items-start text-center sm:text-left mt-10 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="overflow-hidden mb-6"
        >
          <span className="text-premium-black/60 font-semibold tracking-[0.5em] uppercase text-[10px] sm:text-xs">
            Essential Resort Wear
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl sm:text-7xl md:text-[100px] font-sans font-bold tracking-tighter text-premium-black leading-[0.9] mb-8 max-w-4xl"
        >
          THE MODERN<br className="hidden sm:block" />
          <span className="text-premium-black/20">SARONG.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-base sm:text-lg text-premium-black/70 max-w-md mb-12 leading-relaxed font-light"
        >
          Redefining tropical luxury through clean lines, premium fabrics, and uncompromising minimalist aesthetics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <a href="#shop" className="w-full sm:w-auto">
            <button className="btn-premium w-full sm:w-auto">
              Shop Collection
            </button>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center hidden sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-4 text-premium-black/40 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-premium-black/20"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
