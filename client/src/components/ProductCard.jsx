import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.find(item => item._id === product._id);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.images[0]?.url || 'https://via.placeholder.com/400x600'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isWishlisted ? 'bg-premium-gold text-white' : 'bg-white text-premium-black hover:bg-premium-gold hover:text-white'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="p-2 bg-white rounded-full shadow-md text-premium-black hover:bg-premium-gold hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Quick Add Button */}
        <button 
          onClick={(e) => { e.preventDefault(); addToCart(product); }}
          className="absolute bottom-0 left-0 w-full py-4 bg-premium-black text-premium-cream font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 uppercase tracking-widest text-xs"
        >
          Add to Bag
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6 text-center">
        <span className="text-[10px] uppercase tracking-[0.2em] text-premium-gold mb-2 block">
          {product.category}
        </span>
        <h3 className="text-lg font-serif text-premium-black mb-2 group-hover:text-premium-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-premium-black font-medium tracking-wider">
          LKR {product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
