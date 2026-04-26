import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collections from './pages/Collections';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin-dashboard-sarinni" element={<AdminDashboard />} />
        </Routes>

        {/* Footer could be added here */}
        <footer className="bg-premium-cream py-12 border-t border-premium-black/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-serif mb-6 text-premium-black">SARIN<span className="text-premium-gold italic">NI</span></h2>
            <p className="text-premium-black/50 text-sm tracking-widest uppercase mb-8">© 2026 Sarinni Luxury Sarongs. All rights reserved.</p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-xs tracking-widest uppercase hover:text-premium-gold transition-colors">Instagram</a>
              <a href="#" className="text-xs tracking-widest uppercase hover:text-premium-gold transition-colors">Pinterest</a>
              <a href="#" className="text-xs tracking-widest uppercase hover:text-premium-gold transition-colors">Facebook</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
