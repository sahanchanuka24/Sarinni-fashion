import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.find(item => item._id === product._id);

  // If there's a second image, show it on hover. Otherwise fallback to first image.
  const primaryImage = product.images[0]?.url || 'https://via.placeholder.com/400x600';
  const secondaryImage = product.images[1]?.url || primaryImage;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        {/* Primary Image */}
        <img 
          src={primaryImage} 
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        {/* Secondary Image (Hover) */}
        <img 
          src={secondaryImage} 
          alt={`${product.name} alternate view`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100 opacity-0 group-hover:opacity-100"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 right-4 flex flex-col space-y-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-out z-10">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`p-2.5 rounded-full shadow-sm backdrop-blur-md transition-all duration-300 ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-premium-black hover:bg-black hover:text-white'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Quick Add Button */}
        <button 
          onClick={(e) => { e.preventDefault(); addToCart(product); }}
          className="absolute bottom-0 left-0 w-full py-4 bg-white/90 backdrop-blur-md text-premium-black hover:bg-black hover:text-white font-medium translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out tracking-wide text-xs z-10 flex items-center justify-center space-x-2"
        >
          <ShoppingBag size={16} />
          <span>Quick Add</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="px-5 py-6 text-center bg-white flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-medium">
            {product.category}
          </span>
          <h3 className="text-base font-sans font-medium text-premium-black mb-2 truncate">
            {product.name}
          </h3>
        </div>
        <p className="text-premium-black/60 font-medium tracking-wide text-sm mt-auto">
          LKR {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
