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
          isScrolled
            ? 'bg-avurudu-cream/95 backdrop-blur-md py-3 shadow-sm shadow-avurudu-saffron/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-10 flex justify-between items-center">
          {/* Mobile: left side = hamburger */}
          <button
            className="lg:hidden text-avurudu-dark hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex space-x-10 flex-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[12px] font-medium tracking-wide transition-colors link-underline ${
                  isScrolled ? 'text-avurudu-dark' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Logo + Avurudu badge */}
          <div className="flex-shrink-0 flex flex-col justify-center items-center flex-1">
            <a href="/" className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight transition-colors ${isScrolled ? 'text-avurudu-dark' : 'text-white'}`}>
              SARINNI
            </a>
            {/* Avurudu badge below logo */}
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-[9px] font-semibold tracking-[0.25em] uppercase mt-0.5 text-avurudu-saffron hidden sm:block"
            >
              ✨ Avurudu Collection 2026
            </motion.span>
          </div>

          {/* Right icons */}
          <div className="flex items-center justify-end space-x-5 flex-1">
            {/* Search — hidden on xs, visible sm+ */}
            <button
              onClick={openSearch}
              className={`hover:opacity-60 transition-opacity hidden sm:block ${isScrolled ? 'text-avurudu-dark' : 'text-white'}`}
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* Wishlist — hidden on mobile */}
            <Link to="/wishlist" className={`hover:opacity-60 transition-opacity hidden sm:block relative ${isScrolled ? 'text-avurudu-dark' : 'text-white'}`}>
              <Heart size={19} strokeWidth={1.5} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 bg-avurudu-terracotta text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Search on mobile */}
            <button
              onClick={openSearch}
              className={`hover:opacity-60 transition-opacity sm:hidden ${isScrolled ? 'text-avurudu-dark' : 'text-white'}`}
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`hover:opacity-60 transition-opacity relative ${isScrolled ? 'text-avurudu-dark' : 'text-white'}`}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 bg-avurudu-saffron text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
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
            className="fixed inset-0 bg-avurudu-cream/97 backdrop-blur-xl z-[90] flex flex-col"
          >
            <div className="container mx-auto px-6 lg:px-10 pt-8 pb-6 flex items-center gap-4 border-b border-avurudu-saffron/15">
              <Search size={22} strokeWidth={1.5} className="text-avurudu-saffron shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search sarongs, categories..."
                className="flex-1 text-xl font-sans font-light bg-transparent outline-none text-avurudu-dark placeholder:text-avurudu-dark/30"
              />
              <button onClick={closeSearch} className="p-2 hover:opacity-60 transition-opacity">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="container mx-auto px-6 lg:px-10 py-8 overflow-y-auto">
              {searchQuery.trim().length > 1 ? (
                <>
                  <p className="text-xs uppercase tracking-widest text-avurudu-saffron mb-6 font-semibold">
                    {searchResults.length} Results for &ldquo;{searchQuery}&rdquo;
                  </p>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {searchResults.map(product => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="cursor-pointer group"
                          onClick={() => { addToCart(product); closeSearch(); }}
                        >
                          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-avurudu-blush mb-3">
                            <img
                              src={Array.isArray(product.images) && product.images[0] ? product.images[0].url : ''}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-avurudu-saffron font-semibold">LKR {product.price?.toLocaleString()}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-avurudu-dark/40 text-center py-16">No products found.</p>
                  )}
                </>
              ) : (
                <p className="text-avurudu-dark/30 text-center py-20 text-lg font-light">
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
            className="fixed inset-0 bg-avurudu-dark z-[60] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <div>
                <span className="text-2xl font-serif font-bold tracking-tight text-white">SARINNI</span>
                <p className="text-avurudu-saffron text-[9px] tracking-[0.25em] uppercase mt-0.5">✨ Avurudu Collection 2026</p>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:opacity-70">
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
                    className="text-4xl font-serif font-medium text-white hover:text-avurudu-saffron transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              {/* Mobile Cart & Wishlist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-8 flex flex-col items-center gap-4"
              >
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}
                  className="flex items-center gap-3 px-8 py-3.5 bg-avurudu-saffron text-white rounded-full text-sm font-semibold tracking-wide"
                >
                  <ShoppingBag size={16} />
                  View Cart
                  {cartCount > 0 && (
                    <span className="ml-1 bg-white text-avurudu-saffron text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Heart size={14} /> Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
