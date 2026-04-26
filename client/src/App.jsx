import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <CartDrawer />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin-dashboard-sarinni" element={<AdminDashboard />} />
          {/* Catch-all route to redirect back to home for old links */}
          <Route path="*" element={<Home />} />
        </Routes>

        <footer className="bg-premium-rose py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-sans font-bold tracking-tighter mb-6 text-premium-black">SARINNI</h2>
            <p className="text-premium-black/50 text-sm tracking-wide mb-8">© 2026 Sarinni Luxury Sarongs. Minimalist Edition.</p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">Instagram</a>
              <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">Pinterest</a>
              <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">Facebook</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
