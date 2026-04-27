import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Checkout form state
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Sri Lanka',
    phoneNo: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    setIsProcessing(true);
    setCheckoutError('');
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
          image: Array.isArray(item.images) && item.images[0] ? item.images[0].url : '',
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
      setCheckoutError(error.response?.data?.message || 'Checkout failed. Please check your details and try again.');
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
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[80] flex flex-col overflow-hidden"
          >
            <div className="p-5 flex justify-between items-center border-b border-avurudu-saffron/10 shrink-0 bg-white">
              <div>
                <h2 className="text-lg font-serif font-bold tracking-tight text-avurudu-dark">Your Cart</h2>
                <p className="text-avurudu-saffron text-[10px] font-semibold uppercase tracking-widest">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-avurudu-blush rounded-full transition-colors text-avurudu-dark">
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
                  <p className="text-gray-500">We've sent a confirmation email to {shippingInfo.email}. We will contact you soon.</p>
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
                <div className="flex-1 flex flex-col items-center justify-center text-center text-avurudu-dark/40">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4 opacity-30 text-avurudu-saffron" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-xs mt-1">Add some beautiful sarongs 🌸</p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex gap-4 items-center">
                        <img 
                          src={Array.isArray(item.images) && item.images[0] ? item.images[0].url : 'https://via.placeholder.com/80x96'} 
                          alt={item.name} 
                          className="w-20 h-24 object-cover rounded-md shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-sans font-medium text-sm text-premium-black">{item.name}</h4>
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item._id, -1)}
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium hover:bg-gray-100 transition-colors"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item._id, 1)}
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-semibold mt-2">LKR {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-6 border-t border-black/5">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-medium text-gray-600">Subtotal</span>
                      <span className="font-semibold text-lg">LKR {subtotal.toLocaleString()}</span>
                    </div>

                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                          className="w-full px-4 py-2.5 bg-avurudu-cream/50 border border-avurudu-saffron/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-avurudu-saffron/30 text-sm transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          required
                          value={shippingInfo.phoneNo}
                          onChange={(e) => setShippingInfo({...shippingInfo, phoneNo: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-black/20 text-sm transition-all"
                          placeholder="07X XXX XXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Address <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          required
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-black/20 text-sm transition-all"
                          placeholder="Street Address"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">City <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            required
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-black/20 text-sm transition-all"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Postal Code</label>
                          <input 
                            type="text" 
                            value={shippingInfo.postalCode}
                            onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-black/20 text-sm transition-all"
                            placeholder="Optional"
                          />
                        </div>
                      </div>

                      {checkoutError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-4 py-3">
                          {checkoutError}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full btn-premium flex items-center justify-center gap-2 mt-4"
                      >
                        {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Place Order (COD) <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-gray-400 mt-2">Cash on Delivery selected automatically.</p>
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
