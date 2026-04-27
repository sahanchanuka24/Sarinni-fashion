import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';

// Avurudu Footer
const Footer = () => (
  <footer className="bg-avurudu-dark text-white overflow-hidden relative">
    {/* Top decorative band */}
    <div className="h-1 w-full bg-gradient-to-r from-avurudu-terracotta via-avurudu-saffron to-avurudu-jade" />

    <div className="container mx-auto px-6 lg:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">SARINNI</h2>
          <p className="text-avurudu-saffron text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            ✨ Avurudu Collection 2026
          </p>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light">
            Celebrating Sri Lanka's most joyous season with premium sarongs that honour tradition and embrace modern elegance.
          </p>
          <p className="text-avurudu-saffron/70 italic text-sm mt-4">
            අලුත් අවුරුද්ද සුභ වේවා 🌸
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white/80 text-xs font-semibold uppercase tracking-[0.25em] mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: 'Shop Collection', href: '#shop' },
              { label: 'Our Story', href: '#about' },
              { label: 'Wishlist', href: '/wishlist' },
            ].map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/50 hover:text-avurudu-saffron text-sm transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white/80 text-xs font-semibold uppercase tracking-[0.25em] mb-5">Follow Us</h4>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Instagram', icon: '📸', href: '#' },
              { name: 'Facebook', icon: '📘', href: '#' },
              { name: 'Pinterest', icon: '📌', href: '#' },
            ].map(s => (
              <a
                key={s.name}
                href={s.href}
                className="flex items-center gap-3 text-white/50 hover:text-avurudu-saffron text-sm transition-colors group"
              >
                <span className="text-base group-hover:scale-110 transition-transform">{s.icon}</span>
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-avurudu-saffron/20 to-transparent mb-8" />

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-xs">
        <p>© 2026 Sarinni Luxury Sarongs · All rights reserved.</p>
        <p className="text-avurudu-saffron/50 font-medium">
          🌺 Crafted with love in Sri Lanka
        </p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-avurudu-cream">
        <Navbar />
        <CartDrawer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin-dashboard-sarinni" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
