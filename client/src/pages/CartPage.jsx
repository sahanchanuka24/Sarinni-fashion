import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, cartCount } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="pt-32 bg-premium-cream min-h-screen pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-serif text-premium-black mb-12">Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white shadow-sm p-10">
            <div className="flex justify-center mb-6">
              <ShoppingBag size={64} strokeWidth={1} className="text-premium-black/20" />
            </div>
            <p className="text-2xl font-serif text-premium-black mb-8">Your bag is currently empty.</p>
            <Link to="/collections">
              <button className="btn-premium">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div 
                  key={item._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 flex items-center shadow-sm"
                >
                  <img 
                    src={item.images[0]?.url} 
                    alt={item.name} 
                    className="w-24 h-32 object-cover"
                  />
                  <div className="ml-8 flex-grow">
                    <h3 className="text-xl font-serif text-premium-black">{item.name}</h3>
                    <p className="text-premium-gold text-sm mb-4">{item.category}</p>
                    <div className="flex items-center space-x-4">
                      <button className="p-1 hover:text-premium-gold transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-medium">{item.quantity || 1}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-1 hover:text-premium-gold transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium mb-4">LKR {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-premium-black text-premium-cream p-8 sticky top-32">
                <h3 className="text-2xl font-serif mb-8">Summary</h3>
                <div className="space-y-4 mb-8 text-premium-cream/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>LKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-premium-gold uppercase tracking-widest text-xs">Calculated at checkout</span>
                  </div>
                </div>
                <div className="h-[1px] bg-premium-cream/10 mb-8"></div>
                <div className="flex justify-between text-xl font-medium mb-10">
                  <span>Total</span>
                  <span>LKR {subtotal.toLocaleString()}</span>
                </div>
                <button className="w-full py-4 bg-premium-gold text-premium-cream hover:bg-white hover:text-premium-black transition-all duration-300 font-medium tracking-widest uppercase">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
