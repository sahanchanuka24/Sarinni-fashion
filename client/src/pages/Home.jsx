import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios.get('/products')
      .then(({ data }) => setProducts(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [products]);

  const filtered = useMemo(() =>
    activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory),
    [products, activeCategory]
  );

  return (
    <main className="bg-white">
      <Hero />

      {/* Shop Section */}
      <section id="shop" className="px-6 lg:px-12 py-20">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-2">The Collection</p>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-900">New Arrivals</h2>
          </div>
          {!loading && (
            <p className="text-xs text-gray-400">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
          )}
        </div>

        {/* Category filter */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-500 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-6 h-6 border border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 4) * 0.06, duration: 0.35 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-400 py-24">No pieces in this category yet.</p>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left image */}
          <div className="aspect-square lg:aspect-auto lg:min-h-[500px] bg-gray-100 overflow-hidden">
            <img src="/flipora-hero.png" alt="Flipora Brand Story" className="w-full h-full object-cover" loading="lazy" />
          </div>
          {/* Right text */}
          <div className="flex flex-col justify-center px-8 sm:px-16 py-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400 mb-6">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 leading-tight mb-6 tracking-tight">
              Redefining<br />modern hydration.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              Flipora is built on the belief that hydration should be effortless and elegant. We focus on high-performance materials, vacuum-sealed technology, and a minimalist aesthetic that fits every journey. Designed for those who never stop moving.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {[
                { label: 'Insulation', desc: '24h cold / 12h hot' },
                { label: 'Materials', desc: '316 Stainless Steel' },
                { label: 'Eco-Friendly', desc: 'BPA Free & Reusable' },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-900 mb-1">{f.label}</p>
                  <p className="text-xs text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
