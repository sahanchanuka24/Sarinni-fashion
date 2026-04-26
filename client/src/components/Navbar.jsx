import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Navbar = () => {
  const { cartCount, wishlistCount, setIsCartOpen, addToCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const openSearch = useCallback(async () => {
    setIsSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
    if (allProducts.length === 0) {
      try {
        const { data } = await axios.get('/products');
        setAllProducts(data.products || []);
      } catch (e) { /* silent */ }
    }
  }, [allProducts]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const navLinks = [
    { name: 'Shop', href: '#shop' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-10 flex justify-between items-center">
          <button
            className="lg:hidden text-premium-black hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <div className="hidden lg:flex space-x-12 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] font-medium tracking-wide text-premium-black hover:opacity-60 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex-shrink-0 flex justify-center flex-1">
            <a href="#" className="text-3xl font-sans font-bold tracking-tighter text-premium-black">
              SARINNI
            </a>
          </div>

          <div className="flex items-center justify-end space-x-6 flex-1">
            <button
              onClick={openSearch}
              className="text-premium-black hover:opacity-60 transition-opacity hidden sm:block"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link to="/wishlist" className="text-premium-black hover:opacity-60 transition-opacity hidden sm:block relative">
              <Heart size={20} strokeWidth={1.5} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 bg-premium-black text-white font-medium text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="text-premium-black hover:opacity-60 transition-opacity relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 bg-premium-black text-white font-medium text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white"
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[90] flex flex-col"
          >
            <div className="container mx-auto px-6 lg:px-10 pt-8 pb-6 flex items-center gap-4 border-b border-black/5">
              <Search size={22} strokeWidth={1.5} className="text-premium-black/40 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sarongs, categories..."
                className="flex-1 text-xl font-sans font-light bg-transparent outline-none text-premium-black placeholder:text-premium-black/30"
              />
              <button onClick={closeSearch} className="p-2 hover:opacity-60 transition-opacity">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="container mx-auto px-6 lg:px-10 py-8 overflow-y-auto">
              {searchQuery.trim().length > 1 ? (
                <>
                  <p className="text-xs uppercase tracking-widest text-premium-black/40 mb-6 font-medium">
                    {searchResults.length} Results for &ldquo;{searchQuery}&rdquo;
                  </p>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {searchResults.map((product) => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="cursor-pointer group"
                          onClick={() => {
                            addToCart(product);
                            closeSearch();
                          }}
                        >
                          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-50 mb-3">
                            <img
                              src={product.images[0]?.url}
                              alt={product.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-premium-black/50">LKR {product.price?.toLocaleString()}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-premium-black/40 text-center py-16">No products found.</p>
                  )}
                </>
              ) : (
                <p className="text-premium-black/30 text-center py-20 text-lg font-light">
                  Start typing to search&hellip;
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-black/5">
              <span className="text-2xl font-sans font-bold tracking-tighter">SARINNI</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-70">
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-10 space-y-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-4xl font-sans font-medium hover:opacity-60 transition-opacity block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
