import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, wishlistCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past top
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
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
    { name: 'Collections', href: '/collections' },
    { name: 'Batik', href: '/category/batik' },
    { name: 'Resort', href: '/category/resort' },
    { name: 'About', href: '/about' },
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
              <Link 
                key={link.name} 
                to={link.href}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-premium-black/80 hover:text-premium-gold transition-colors link-underline"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex justify-center flex-1">
            <Link to="/" className="text-3xl font-serif tracking-widest text-premium-black">
              SARIN<span className="text-premium-gold italic font-light">NI</span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center justify-end space-x-6 flex-1">
            <Link to="/search" className="text-premium-black hover:text-premium-gold transition-colors hidden sm:block">
              <Search size={18} strokeWidth={1.5} />
            </Link>

            <Link to="/wishlist" className="text-premium-black hover:text-premium-gold transition-colors hidden sm:block relative">
              <Heart size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 bg-premium-rose text-premium-black font-medium text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link to="/cart" className="text-premium-black hover:text-premium-gold transition-colors relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
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
            </Link>
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
            className="fixed inset-0 bg-premium-cream z-[60] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-premium-black/5">
              <span className="text-2xl font-serif tracking-widest">SARIN<span className="text-premium-gold italic font-light">NI</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-70">
                <X size={26} strokeWidth={1} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-10 space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.href}
                    className="text-4xl font-serif hover:text-premium-gold transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="p-10 text-center border-t border-premium-black/5 text-[10px] uppercase tracking-widest text-premium-black/40">
              © 2026 Sarinni
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
