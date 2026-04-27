import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Floating petal component
const Petal = ({ style, emoji }) => (
  <span
    className="petal select-none pointer-events-none text-2xl"
    style={style}
  >
    {emoji}
  </span>
);

const Hero = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const items = ['🌸', '🌼', '🪷', '✨', '🌺', '🍀'];
    const generated = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      emoji: items[i % items.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: `-${Math.random() * 10 + 2}%`,
        fontSize: `${Math.random() * 16 + 14}px`,
        animationDuration: `${Math.random() * 8 + 7}s`,
        animationDelay: `${Math.random() * 6}s`,
        opacity: Math.random() * 0.5 + 0.3,
      },
    }));
    setPetals(generated);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-avurudu-dark">
      {/* Floating petals */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {petals.map(p => <Petal key={p.id} {...p} />)}
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="/avurudu-hero.jpg"
            alt="Avurudu Sarong Collection"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-avurudu-dark/90 via-avurudu-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-avurudu-dark/70 via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-10 min-h-screen flex flex-col justify-center items-center sm:items-start text-center sm:text-left pt-24 pb-16">

        {/* Avurudu Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <span className="badge-avurudu">
            🪔 &nbsp;Avurudu Collection 2026
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl sm:text-7xl md:text-[88px] font-serif font-bold tracking-tight text-white leading-[1] mb-4 max-w-3xl"
        >
          Celebrate{' '}
          <span className="text-avurudu-saffron italic">Avurudu</span>
          <br className="hidden sm:block" />
          <span className="text-white/70 font-normal not-italic text-4xl sm:text-6xl md:text-7xl">in Sarinni.</span>
        </motion.h1>

        {/* Sinhala sub-line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 1 }}
          className="text-avurudu-saffron/80 text-lg sm:text-xl font-light tracking-widest mb-4"
        >
          අලුත් අවුරුද්ද සුභ වේවා 🌸
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-white/70 text-base sm:text-lg max-w-md mb-10 leading-relaxed font-light"
        >
          Our finest sarongs, handcrafted to honour Sri Lanka's most joyous season. Premium fabrics in vibrant festival colours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <a href="#shop" className="w-full sm:w-auto">
            <button className="btn-premium w-full sm:w-auto text-sm px-8 py-4">
              🛍️ &nbsp;Shop Avurudu Collection
            </button>
          </a>
          <a href="#about" className="w-full sm:w-auto">
            <button className="btn-outline w-full sm:w-auto text-sm px-8 py-4">
              Our Story
            </button>
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex gap-10 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { num: '100%', label: 'Sri Lankan Made' },
            { num: 'Premium', label: 'Hand-picked Fabrics' },
            { num: 'Free', label: 'Delivery Island-wide*' },
          ].map(s => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="text-avurudu-saffron font-bold text-lg sm:text-xl">{s.num}</p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center hidden sm:flex z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] mb-3 text-white/40 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-avurudu-saffron/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
