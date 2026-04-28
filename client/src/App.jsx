import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';

const Footer = () => (
  <footer className="border-t border-gray-100 px-6 lg:px-12 py-12">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
      <div>
        <p className="text-lg font-semibold tracking-[0.25em] uppercase text-gray-900 mb-1">Flipora</p>
        <p className="text-xs text-gray-400">Premium Hydration Essentials</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-[11px] text-gray-400 uppercase tracking-widest">
        <a href="#shop" className="hover:text-gray-900 transition-colors">Shop</a>
        <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
        <a href="mailto:hello@flipora.com" className="hover:text-gray-900 transition-colors">Contact</a>
      </div>
      <p className="text-[11px] text-gray-300">© 2026 Flipora · High-Performance Hydration</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin-dashboard-flipora" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
