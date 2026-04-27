import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [added, setAdded] = useState(false);
  const isWishlisted = wishlist.find(item => item._id === product._id);

  const images = Array.isArray(product.images) ? product.images : [];
  const primary   = images[0]?.url || '';
  const secondary = images[1]?.url || primary;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2F2F2]">
        {primary && (
          <>
            <img src={primary} alt={product.name} loading="lazy" decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
            <img src={secondary} alt={product.name} loading="lazy" decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-[1.03] group-hover:scale-100 transition-transform" />
          </>
        )}
        {!primary && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <ShoppingBag size={32} strokeWidth={1} />
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
            isWishlisted ? 'bg-black text-white' : 'bg-white/90 text-black hover:bg-black hover:text-white'
          }`}
        >
          <Heart size={13} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add — bottom bar on hover (desktop) */}
        <button
          onClick={handleAdd}
          className={`absolute bottom-0 left-0 w-full py-3 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hidden sm:flex items-center justify-center gap-2
            ${added ? 'bg-[#3D7A5C] text-white translate-y-0' : 'bg-black text-white translate-y-full group-hover:translate-y-0'}`}
        >
          {added ? '✓ Added' : 'Quick Add'}
        </button>
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
        <p className="text-sm text-gray-500 mt-0.5">LKR {product.price?.toLocaleString()}</p>

        {/* Mobile add button — always visible */}
        <button
          onClick={handleAdd}
          className={`mt-2.5 w-full py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 sm:hidden ${
            added ? 'bg-[#3D7A5C] text-white' : 'bg-black text-white'
          }`}
        >
          {added ? '✓ Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
