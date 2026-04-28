import React, { useState, useRef, useCallback } from 'react';
import { ShoppingBag, Search, X, Menu, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Navbar = () => {
  const { cartCount, setIsCartOpen, addToCart } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const searchRef = useRef(null);

  const openSearch = useCallback(async () => {
    setIsSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 80);
    if (!allProducts.length) {
      try { const { data } = await axios.get('/products'); setAllProducts(data.products || []); }
      catch { }
    }
  }, [allProducts]);

  const closeSearch = () => { setIsSearchOpen(false); setSearchQuery(''); };

  const results = searchQuery.trim().length > 1
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-8 h-16">
          {/* Left — Mobile Menu & Links */}
          <div className="flex-1 flex items-center gap-6">
            <button className="lg:hidden text-gray-800 hover:text-black transition-colors" onClick={() => setIsMobileOpen(true)}>
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <div className="hidden lg:flex gap-8">
              {[['Shop', '#shop'], ['About', '#about'], ['Contact', '#footer']].map(([name, href]) => (
                <a key={name} href={href} className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors">
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Center — Logo */}
          <a href="/" className="text-2xl font-bold tracking-[0.2em] uppercase text-black flex-shrink-0 text-center">
            Flipora
          </a>

          {/* Right — Icons */}
          <div className="flex-1 flex items-center justify-end gap-5">
            <button onClick={openSearch} className="text-gray-600 hover:text-black transition-colors hidden sm:block">
              <Search size={20} strokeWidth={1.5} />
            </button>

            <a href="/admin-dashboard-flipora" className="text-gray-600 hover:text-black transition-colors" title="Admin Dashboard">
              <User size={20} strokeWidth={1.5} />
            </a>

            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-800 hover:text-black transition-colors flex items-center gap-2">
              <ShoppingBag size={20} strokeWidth={1.5} />
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

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[90] flex flex-col">
            <div className="flex items-center gap-4 px-6 lg:px-12 h-20 border-b border-gray-100 bg-white shadow-sm">
              <Search size={22} strokeWidth={1.5} className="text-gray-400 shrink-0" />
              <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 text-lg sm:text-xl bg-transparent outline-none text-black placeholder:text-gray-300 font-light" />
              <button onClick={closeSearch} className="text-gray-500 hover:text-black transition-colors"><X size={28} strokeWidth={1.5} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-10">
              {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {results.map(p => (
                    <div key={p._id} className="cursor-pointer group" onClick={() => { addToCart(p); closeSearch(); }}>
                      <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-3 rounded-md border border-gray-100">
                        {p.images?.[0]?.url && (
                          <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-1">LKR {p.price?.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <p className="text-gray-400 text-lg font-light">
                    {searchQuery.trim().length > 1 ? 'No results found.' : 'What are you looking for?'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-80 bg-white z-[80] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
              <span className="text-lg font-bold tracking-widest uppercase">Menu</span>
              <button onClick={() => setIsMobileOpen(false)} className="text-gray-500 hover:text-black"><X size={24} strokeWidth={1.5} /></button>
            </div>
            <nav className="flex flex-col p-6 gap-2">
              {[['Shop', '#shop'], ['About', '#about'], ['Admin Dashboard', '/admin-dashboard-flipora']].map(([name, href]) => (
                <a key={name} href={href} onClick={() => setIsMobileOpen(false)}
                  className="py-4 text-sm font-semibold tracking-widest uppercase border-b border-gray-50 text-gray-800 hover:text-black transition-colors flex justify-between items-center">
                  {name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {isMobileOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[79]" onClick={() => setIsMobileOpen(false)} />}
    </>
  );
};

export default Navbar;
