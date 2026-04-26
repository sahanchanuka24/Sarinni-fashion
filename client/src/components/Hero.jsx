import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-sarong.png';

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-premium-cream overflow-hidden">
      {/* Background Image - optimized, no heavy continuous animations */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src={heroImage} 
            alt="Premium Sarong Collection" 
            className="w-full h-full object-cover object-[center_20%]"
          />
        </motion.div>
        {/* Soft overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-premium-cream via-premium-cream/40 to-transparent sm:bg-gradient-to-r sm:from-premium-cream/80 sm:via-premium-cream/50 sm:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center sm:justify-center items-center sm:items-start text-center sm:text-left mt-10 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="overflow-hidden mb-6"
        >
          <span className="text-premium-gold font-medium tracking-[0.4em] uppercase text-xs sm:text-sm">
            Tropical Luxury
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif text-premium-black leading-[1.1] mb-6 max-w-3xl"
        >
          Redefining the <br className="hidden sm:block" />
          <span className="italic text-premium-gold font-light">Modern Sarong</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-base sm:text-lg text-premium-black/70 max-w-md mb-12 leading-relaxed"
        >
          Experience the fusion of traditional craftsmanship and contemporary resort style. Handcrafted for the discerning traveler.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link to="/collections" className="w-full sm:w-auto">
            <button className="btn-premium w-full sm:w-auto">
              Shop Collection
            </button>
          </Link>
          <button className="btn-outline w-full sm:w-auto">
            Resort Lookbook
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center hidden sm:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] mb-3 text-premium-black/40">Discover</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-premium-gold to-transparent opacity-50"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
