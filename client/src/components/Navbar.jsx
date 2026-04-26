import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, wishlistCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-premium-black hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Navigation Links - Desktop */}
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

          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center flex-1">
            <a href="#" className="text-3xl font-sans font-bold tracking-tighter text-premium-black">
              SARINNI
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center justify-end space-x-6 flex-1">
            <Link to="/search" className="text-premium-black hover:opacity-60 transition-opacity hidden sm:block">
              <Search size={20} strokeWidth={1.5} />
            </Link>

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

      {/* Mobile Menu Overlay */}
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
