import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [touched, setTouched] = useState(false);
  const [added, setAdded] = useState(false);
  const isWishlisted = wishlist.find(item => item._id === product._id);

  const images = Array.isArray(product.images) ? product.images : [];
  const primaryImage = images[0]?.url || 'https://via.placeholder.com/400x600';
  const secondaryImage = images[1]?.url || primaryImage;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-avurudu-saffron/5 hover:border-avurudu-saffron/25"
      onTouchStart={() => setTouched(true)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-avurudu-blush">
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        <img
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105 group-hover:scale-100 opacity-0 group-hover:opacity-100"
        />

        {/* Warm overlay */}
        <div className="absolute inset-0 bg-avurudu-saffron/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist button */}
        <div className={`absolute top-3 right-3 z-10 transition-transform duration-500 ease-out ${touched ? 'translate-x-0' : 'translate-x-14 group-hover:translate-x-0'}`}>
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-300 ${
              isWishlisted
                ? 'bg-avurudu-terracotta text-white'
                : 'bg-white/90 text-avurudu-dark hover:bg-avurudu-saffron hover:text-white'
            }`}
          >
            <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Quick Add (desktop hover) */}
        <button
          onClick={handleAdd}
          className={`absolute bottom-0 left-0 w-full py-4 backdrop-blur-md font-semibold transition-all duration-500 ease-out tracking-wide text-xs z-10 flex items-center justify-center space-x-2 ${
            added
              ? 'bg-avurudu-jade text-white translate-y-0'
              : touched
              ? 'bg-avurudu-saffron text-white translate-y-0'
              : 'bg-avurudu-saffron/90 text-white translate-y-full group-hover:translate-y-0'
          }`}
        >
          <ShoppingBag size={15} />
          <span>{added ? '✓ Added!' : 'Quick Add'}</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="px-4 py-5 text-center bg-white flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-avurudu-saffron mb-1 block font-semibold">
            {product.category}
          </span>
          <h3 className="text-sm font-medium text-avurudu-dark mb-1 truncate">
            {product.name}
          </h3>
        </div>
        <div className="mt-3">
          <p className="text-avurudu-dark/70 font-semibold tracking-wide text-sm">
            LKR {product.price?.toLocaleString()}
          </p>
          {/* Mobile always-visible add button */}
          <button
            onClick={handleAdd}
            className={`mt-3 w-full py-2.5 text-xs font-semibold rounded-full tracking-wide flex items-center justify-center gap-2 sm:hidden active:scale-[0.97] transition-all duration-300 ${
              added
                ? 'bg-avurudu-jade text-white'
                : 'bg-avurudu-saffron text-white hover:bg-avurudu-terracotta'
            }`}
          >
            <ShoppingBag size={13} />
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
