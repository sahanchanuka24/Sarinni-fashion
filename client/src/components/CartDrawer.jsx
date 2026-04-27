import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartCount, clearCart } = useCart();
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    email: '', address: '', city: '', postalCode: '', country: 'Sri Lanka', phoneNo: ''
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

      // Add a 10s timeout so it doesn't hang forever
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      await axios.post('/orders/new', orderData, { signal: controller.signal });
      clearTimeout(timeout);

      clearCart();
      setStep('success');
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        setCheckoutError('Request timed out. Please check your connection and try again.');
      } else {
        setCheckoutError(error.response?.data?.message || 'Checkout failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gray-800 transition-colors";
  const labelClass = "block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5";

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsCartOpen(false); setStep('cart'); }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[80] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <div>
                <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900">
                  {step === 'success' ? 'Order Placed' : step === 'checkout' ? 'Checkout' : 'Your Bag'}
                </h2>
                {step === 'cart' && <p className="text-[10px] text-gray-400 mt-0.5">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>}
              </div>
              <div className="flex items-center gap-3">
                {step === 'checkout' && (
                  <button onClick={() => setStep('cart')} className="text-[11px] text-gray-400 hover:text-gray-800 uppercase tracking-widest transition-colors">
                    ← Back
                  </button>
                )}
                <button onClick={() => { setIsCartOpen(false); setStep('cart'); }} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {step === 'success' ? (
                /* ── Success ── */
                <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Order Confirmed</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    A confirmation email has been sent to <strong>{shippingInfo.email}</strong>. We'll be in touch shortly.
                  </p>
                  <button
                    onClick={() => { setStep('cart'); setIsCartOpen(false); }}
                    className="mt-4 px-8 py-3 bg-gray-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-gray-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

              ) : step === 'cart' ? (
                /* ── Cart Items ── */
                cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-3">
                    <ShoppingBag size={40} strokeWidth={1} />
                    <p className="text-sm">Your bag is empty</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {cartItems.map(item => (
                      <div key={item._id} className="flex gap-4 px-6 py-5">
                        <img
                          src={Array.isArray(item.images) && item.images[0] ? item.images[0].url : 'https://via.placeholder.com/64x80'}
                          alt={item.name}
                          className="w-16 h-20 object-cover bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{item.category}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <button onClick={() => updateQuantity(item._id, -1)} className="w-6 h-6 border border-gray-200 flex items-center justify-center hover:border-gray-800 transition-colors">
                              <Minus size={10} />
                            </button>
                            <span className="text-xs font-medium w-5 text-center">{item.quantity || 1}</span>
                            <button onClick={() => updateQuantity(item._id, 1)} className="w-6 h-6 border border-gray-200 flex items-center justify-center hover:border-gray-800 transition-colors">
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                          <p className="text-xs font-semibold text-gray-900">LKR {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )

              ) : (
                /* ── Checkout Form ── */
                <form onSubmit={handleCheckout} className="px-6 py-5 space-y-4">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" required value={shippingInfo.email}
                      onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input type="tel" required value={shippingInfo.phoneNo}
                      onChange={e => setShippingInfo({ ...shippingInfo, phoneNo: e.target.value })}
                      className={inputClass} placeholder="07X XXX XXXX" />
                  </div>
                  <div>
                    <label className={labelClass}>Address *</label>
                    <input type="text" required value={shippingInfo.address}
                      onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className={inputClass} placeholder="Street address" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>City *</label>
                      <input type="text" required value={shippingInfo.city}
                        onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className={inputClass} placeholder="City" />
                    </div>
                    <div>
                      <label className={labelClass}>Postal Code</label>
                      <input type="text" value={shippingInfo.postalCode}
                        onChange={e => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                        className={inputClass} placeholder="Optional" />
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3">
                      {checkoutError}
                    </div>
                  )}

                  <button type="submit" disabled={isProcessing}
                    className="w-full py-4 bg-gray-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-gray-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-3 mt-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>Place Order (COD) <ArrowRight size={14} /></>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-400">Cash on Delivery · Free Returns</p>
                </form>
              )}
            </div>

            {/* Footer — only show when cart has items and on cart step */}
            {step === 'cart' && cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Subtotal</span>
                  <span className="text-sm font-semibold text-gray-900">LKR {subtotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => { setCheckoutError(''); setStep('checkout'); }}
                  className="w-full py-4 bg-gray-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-2">Cash on Delivery · Island-wide Delivery</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
