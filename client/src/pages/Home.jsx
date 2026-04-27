import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Avurudu About Section
const AboutSection = () => (
  <section id="about" className="py-24 bg-avurudu-dark text-white overflow-hidden relative">
    {/* Decorative background glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-avurudu-saffron/10 rounded-full blur-3xl pointer-events-none" />

    <div className="container mx-auto px-6 lg:px-10 relative z-10">
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <span className="badge-avurudu mb-6">🌺 &nbsp;Our Story</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight max-w-3xl">
          Born from the{' '}
          <span className="text-avurudu-saffron italic">Spirit of Avurudu</span>
        </h2>
        <div className="divider-avurudu w-48 mt-8 mx-auto" />
        <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mt-6 font-light">
          Every year, Sri Lanka pauses to celebrate new beginnings — a moment to wear colour, gather with loved ones, and embrace tradition. <strong className="text-white/90 font-medium">Sarinni</strong> was created to honour that very spirit. Our sarongs carry the warmth of the Avurudu sun, handcrafted with premium fabrics that celebrate our island's rich cultural heritage.
        </p>
        <p className="text-avurudu-saffron/80 text-base italic mt-4 font-light">
          අලුත් අවුරුද්ද — A new beginning, wrapped in beauty.
        </p>
      </motion.div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {[
          {
            icon: '🪡',
            title: 'Traditional Craftsmanship',
            desc: 'Every sarong is woven with techniques passed down through generations, celebrating the artistry of Sri Lankan textile culture.',
          },
          {
            icon: '🌺',
            title: 'Festival Colours',
            desc: 'Our Avurudu collection draws from the vibrant hues of lotus blooms, marigold garlands, and the golden light of the Sinhala New Year sunrise.',
          },
          {
            icon: '✨',
            title: 'Premium Fabrics',
            desc: 'Lightweight, breathable, and luxuriously soft — our fabrics are chosen to feel as joyful to wear as Avurudu itself.',
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white/5 border border-white/10 hover:border-avurudu-saffron/40 rounded-2xl p-8 text-center transition-all duration-300 group hover:bg-white/10"
          >
            <div className="text-4xl mb-5 group-hover:animate-[floatAnim_3s_ease-in-out_infinite]">
              {card.icon}
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">{card.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center mt-16"
      >
        <a href="#shop">
          <button className="btn-premium px-12 py-4 text-sm">
            🛍️ &nbsp;Explore the Collection
          </button>
        </a>
      </motion.div>
    </div>
  </section>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <main className="bg-avurudu-cream">
      <Hero />

      {/* Shop Section */}
      <section id="shop" className="py-24 container mx-auto px-6 lg:px-10">
        <div className="flex flex-col items-center mb-14 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="badge-avurudu mb-5"
          >
            🌼 &nbsp;Avurudu 2026
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-avurudu-dark"
          >
            The Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-avurudu-dark/50 text-sm max-w-md mx-auto"
          >
            Meticulously crafted sarongs that bring the warmth and colour of Avurudu to every occasion.
          </motion.p>
        </div>

        {/* Category Filter */}
        {!loading && categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-avurudu-saffron text-white shadow-md shadow-avurudu-saffron/30'
                    : 'bg-white border border-avurudu-saffron/20 text-avurudu-dark/60 hover:border-avurudu-saffron/50 hover:text-avurudu-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Product count */}
        {!loading && (
          <p className="text-center text-xs text-avurudu-dark/40 mb-10 tracking-wide uppercase font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'} Available
          </p>
        )}

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-2 border-avurudu-saffron border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 4) * 0.08, duration: 0.4, ease: 'easeOut' }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-avurudu-dark/40">
            <p className="text-3xl mb-4">🌸</p>
            <p className="text-lg">No sarongs in this category yet.</p>
          </div>
        )}
      </section>

      {/* Avurudu About Section */}
      <AboutSection />
    </main>
  );
};

export default Home;
