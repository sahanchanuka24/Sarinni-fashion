import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-sarong.png';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-premium-cream">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={heroImage} 
          alt="Premium Sarong Collection" 
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-premium-cream/40 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-start">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-premium-gold font-medium tracking-[0.3em] uppercase mb-4"
        >
          Tropical Luxury
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-6xl md:text-8xl font-serif text-premium-black leading-[1.1] mb-8 max-w-2xl"
        >
          Redefining the <br />
          <span className="italic text-premium-gold">Modern Sarong</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg text-premium-black/70 max-w-md mb-10 leading-relaxed"
        >
          Experience the fusion of traditional craftsmanship and contemporary resort style. Handcrafted for the discerning traveler.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex space-x-6"
        >
          <Link to="/collections">
            <button className="btn-premium">
              Shop Collection
            </button>
          </Link>
          <button className="px-8 py-3 border border-premium-black text-premium-black hover:bg-premium-black hover:text-premium-cream transition-all duration-300 font-medium tracking-wider">
            Resort Lookbook
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest mb-2 text-premium-black/50">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-premium-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
