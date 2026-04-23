import React from 'react';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist } = useCart();

  return (
    <div className="pt-32 bg-premium-cream min-h-screen pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-serif text-premium-black mb-12">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white shadow-sm p-10">
            <div className="flex justify-center mb-6">
              <Heart size={64} strokeWidth={1} className="text-premium-black/20" />
            </div>
            <p className="text-2xl font-serif text-premium-black mb-8">Your wishlist is empty.</p>
            <Link to="/collections">
              <button className="btn-premium">Explore Collections</button>
            </Link>
          </div>
        ) : (
          <ProductGrid 
            products={wishlist} 
            title="Saved Items" 
            subtitle="Your Favorites" 
          />
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
