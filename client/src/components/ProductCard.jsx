import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const images = Array.isArray(product.images) ? product.images : [];
  const primary   = images[0]?.url || '';

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-transparent hover:border-gray-100 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        {primary ? (
          <img 
            src={primary} 
            alt={product.name} 
            loading="lazy" 
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <ShoppingBag size={32} strokeWidth={1} />
          </div>
        )}
      </div>

      {/* Product Info & Actions */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 gap-2">
          <p className="text-sm font-semibold text-gray-900 leading-snug">{product.name}</p>
          <p className="text-sm font-bold text-gray-900 shrink-0">LKR {product.price?.toLocaleString()}</p>
        </div>
        
        <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-4 font-medium">{product.category}</p>

        {/* Always visible Add to Cart button */}
        <div className="mt-auto pt-2">
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
              added 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-black hover:bg-black hover:text-white'
            }`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Bag
              </>
            ) : (
              'Add to Bag'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
