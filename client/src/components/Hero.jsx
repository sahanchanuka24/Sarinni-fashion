import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Petal = ({ style, emoji }) => (
  <span className="petal select-none pointer-events-none" style={style}>{emoji}</span>
);

const Hero = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const items = ['🌸', '✦', '🌺', '✧', '🪷'];
    const generated = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      emoji: items[i % items.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: `-3%`,
        fontSize: `${Math.random() * 12 + 10}px`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        animationDelay: `${Math.random() * 8}s`,
        opacity: Math.random() * 0.4 + 0.2,
      },
    }));
    setPetals(generated);
  }, []);

  return (
    <section className="relative w-full bg-[#0F0F0F] overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Floating petals */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {petals.map(p => <Petal key={p.id} {...p} />)}
      </div>

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="/avurudu-hero.jpg"
          alt="Avurudu Sarong Collection"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end pb-16 sm:pb-24 px-6 lg:px-16" style={{ minHeight: '100svh' }}>
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-white/50 mb-5"
          >
            Avurudu Collection — 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9 }}
            className="text-5xl sm:text-6xl md:text-7xl font-light text-white leading-[1.05] mb-3 tracking-tight"
          >
            SARINNI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-white/40 text-sm tracking-[0.2em] mb-2 italic font-light"
          >
            අලුත් අවුරුද්ද සුභ වේවා
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mb-10 font-light"
          >
            Premium sarongs crafted for the Sri Lankan New Year — where tradition meets modern elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
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

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 right-8 hidden sm:flex flex-col items-center gap-3 z-20"
      >
        <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center mb-6">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
