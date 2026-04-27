import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingBag, Search, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Navbar = () => {
  const { cartCount, setIsCartOpen, addToCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      last = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openSearch = useCallback(async () => {
    setIsSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 80);
    if (!allProducts.length) {
      try { const { data } = await axios.get('/products'); setAllProducts(data.products || []); }
      catch {}
    }
  }, [allProducts]);

  const closeSearch = () => { setIsSearchOpen(false); setSearchQuery(''); };

  const results = searchQuery.trim().length > 1
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  const textColor = isScrolled ? 'text-[#0F0F0F]' : 'text-white';
  const navBg = isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100' : 'bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}>
        <div className="flex items-center justify-between px-6 lg:px-12 h-14 sm:h-16">
          {/* Left — hamburger (mobile) / links (desktop) */}
          <div className="flex-1 flex items-center gap-8">
            <button className={`lg:hidden ${textColor} hover:opacity-60 transition-opacity`} onClick={() => setIsMobileOpen(true)}>
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <div className="hidden lg:flex gap-8">
              {[['Shop','#shop'],['About','#about']].map(([n,h]) => (
                <a key={n} href={h} className={`text-[11px] font-medium tracking-[0.18em] uppercase hover:opacity-50 transition-opacity ${textColor}`}>{n}</a>
              ))}
            </div>
          </div>

          {/* Center — Logo */}
          <a href="/" className={`text-xl sm:text-2xl font-semibold tracking-[0.25em] uppercase transition-colors flex-shrink-0 ${textColor}`}>
            Sarinni
          </a>

          {/* Right — icons */}
          <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6">
            <button onClick={openSearch} className={`hover:opacity-50 transition-opacity ${textColor}`}>
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button onClick={() => setIsCartOpen(true)} className={`relative hover:opacity-50 transition-opacity ${textColor}`}>
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[90] flex flex-col">
            <div className="flex items-center gap-4 px-6 lg:px-12 h-16 border-b border-gray-100">
              <Search size={18} strokeWidth={1.5} className="text-gray-300 shrink-0" />
              <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search sarongs…"
                className="flex-1 text-base bg-transparent outline-none text-gray-900 placeholder:text-gray-300" />
              <button onClick={closeSearch} className="hover:opacity-60 transition-opacity"><X size={20} strokeWidth={1.5} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8">
              {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {results.map(p => (
                    <div key={p._id} className="cursor-pointer group" onClick={() => { addToCart(p); closeSearch(); }}>
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-2">
                        {p.images?.[0]?.url && (
                          <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                      </div>
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">LKR {p.price?.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 text-center py-24 text-base">
                  {searchQuery.trim().length > 1 ? 'No results found.' : 'Start typing to search…'}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="fixed inset-y-0 left-0 w-72 bg-white z-[80] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
              <span className="text-base font-semibold tracking-widest uppercase">Sarinni</span>
              <button onClick={() => setIsMobileOpen(false)}><X size={20} strokeWidth={1.5} /></button>
            </div>
            <nav className="flex flex-col gap-1 p-6">
              {[['Shop','#shop'],['About','#about']].map(([n,h]) => (
                <a key={n} href={h} onClick={() => setIsMobileOpen(false)}
                  className="py-3 text-sm font-medium tracking-widest uppercase border-b border-gray-100 hover:text-gray-400 transition-colors">
                  {n}
                </a>
              ))}
            </nav>
            <div className="px-6 mt-auto pb-8">
              <button onClick={() => { setIsMobileOpen(false); setIsCartOpen(true); }}
                className="w-full py-3.5 bg-black text-white text-[11px] font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2">
                <ShoppingBag size={14} /> View Bag {cartCount > 0 && `(${cartCount})`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isMobileOpen && <div className="fixed inset-0 bg-black/20 z-[79]" onClick={() => setIsMobileOpen(false)} />}
    </>
  );
};

export default Navbar;
