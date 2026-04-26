import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Minimal checkout form state (for guest checkout directly in the drawer)
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    address: 'Guest Address', // Hardcoded for simplicity in UI test
    city: 'Guest City',
    postalCode: '00000',
    country: 'Sri Lanka',
    phoneNo: '0700000000'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!shippingInfo.email) {
      alert("Please enter an email address for your receipt.");
      return;
    }
    
    setIsProcessing(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
          image: item.images[0]?.url,
          product: item._id
        })),
        shippingInfo,
        paymentInfo: { method: 'cash_on_delivery', status: 'pending' },
        itemsPrice: subtotal,
        shippingPrice: 0,
        totalPrice: subtotal
      };

      await axios.post('/orders/new', orderData);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[80] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-black/5">
              <h2 className="text-xl font-sans font-semibold tracking-tight">Your Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {orderSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-sans font-semibold">Order Received!</h3>
                  <p className="text-gray-500">We've sent a confirmation email to {shippingInfo.email}.</p>
                  <button 
                    onClick={() => {
                      setOrderSuccess(false);
                      setIsCartOpen(false);
                    }}
                    className="btn-outline mt-8"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4 items-center">
                      <img 
                        src={item.images[0]?.url} 
                        alt={item.name} 
                        className="w-20 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-sans font-medium text-sm text-premium-black">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity || 1}</p>
                        <p className="text-sm font-medium mt-2">LKR {item.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  <div className="mt-8 pt-6 border-t border-black/5">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-medium text-gray-600">Subtotal</span>
                      <span className="font-semibold text-lg">LKR {subtotal.toLocaleString()}</span>
                    </div>

                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Email for Receipt</label>
                        <input 
                          type="email" 
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-black/20 text-sm transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full btn-premium flex items-center justify-center gap-2 mt-4"
                      >
                        {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Checkout Now <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-gray-400 mt-4">Cash on Delivery selected automatically.</p>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
