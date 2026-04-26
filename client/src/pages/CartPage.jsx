import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    address: '',
    city: '',
    phoneNo: '',
    postalCode: '',
    country: 'Sri Lanka'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shippingPrice = subtotal > 15000 ? 0 : 500;
  const totalPrice = subtotal + shippingPrice;

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          image: item.images[0]?.url,
          price: item.price,
          product: item._id
        })),
        shippingInfo,
        paymentInfo: {
          method: 'cash_on_delivery',
          status: 'pending'
        },
        itemsPrice: subtotal,
        shippingPrice,
        totalPrice
      };

      const { data } = await axios.post('/orders/new', orderData);

      if (data.success) {
        setOrderSuccess(true);
        clearCart();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while placing your order.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="pt-32 bg-premium-cream min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 shadow-sm text-center max-w-lg mx-6"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle size={80} className="text-premium-gold" strokeWidth={1} />
          </div>
          <h2 className="text-4xl font-serif text-premium-black mb-4">Order Confirmed</h2>
          <p className="text-premium-black/60 mb-8 leading-relaxed">
            Thank you for your purchase! We've sent a confirmation email to <strong>{shippingInfo.email}</strong> with your order details.
          </p>
          <Link to="/collections">
            <button className="btn-premium">Continue Shopping</button>
          </Link>
        </motion.div>
      </div>
    );
  }

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
            {/* Left Column: Cart Items or Shipping Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {!showCheckout ? (
                  <motion.div 
                    key="cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {cartItems.map((item) => (
                      <div 
                        key={item._id}
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
                            <span className="text-sm font-medium tracking-widest text-premium-black/40 uppercase">Qty: {item.quantity || 1}</span>
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
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="checkout"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-10 shadow-sm"
                  >
                    <button 
                      onClick={() => setShowCheckout(false)}
                      className="text-premium-black/50 hover:text-premium-black mb-8 flex items-center space-x-2 uppercase tracking-widest text-xs"
                    >
                      <ArrowRight size={16} className="rotate-180" />
                      <span>Back to Bag</span>
                    </button>
                    
                    <h2 className="text-3xl font-serif text-premium-black mb-8">Shipping Information</h2>
                    
                    {error && (
                      <div className="bg-red-50 text-red-500 p-4 mb-6 text-sm border border-red-100">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Email Address (for confirmation)</label>
                        <input 
                          required
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleInputChange}
                          className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
                          placeholder="customer@example.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Street Address</label>
                        <input 
                          required
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleInputChange}
                          className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
                          placeholder="No. 123, Luxury Road"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">City</label>
                        <input 
                          required
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleInputChange}
                          className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
                          placeholder="Colombo"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Phone Number</label>
                        <input 
                          required
                          name="phoneNo"
                          value={shippingInfo.phoneNo}
                          onChange={handleInputChange}
                          className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
                          placeholder="077 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Postal Code</label>
                        <input 
                          required
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
                          placeholder="10100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Country</label>
                        <input 
                          readOnly
                          value={shippingInfo.country}
                          className="w-full bg-premium-cream/10 border-b border-premium-black/10 py-3 px-4 text-premium-black/40 outline-none"
                        />
                      </div>
                      
                      <div className="md:col-span-2 mt-8">
                        <button 
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 bg-premium-black text-premium-cream hover:bg-premium-gold transition-all duration-500 font-medium tracking-widest uppercase disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Confirm Order (Cash on Delivery)'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Summary */}
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
                    <span>{shippingPrice === 0 ? 'FREE' : `LKR ${shippingPrice.toLocaleString()}`}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-premium-cream/10 mb-8"></div>
                <div className="flex justify-between text-xl font-medium mb-10">
                  <span>Total</span>
                  <span>LKR {totalPrice.toLocaleString()}</span>
                </div>
                
                {!showCheckout && (
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-4 bg-premium-gold text-premium-cream hover:bg-white hover:text-premium-black transition-all duration-300 font-medium tracking-widest uppercase"
                  >
                    Proceed to Checkout
                  </button>
                )}
                
                <div className="mt-6 flex items-center justify-center space-x-2 text-premium-cream/40 text-[10px] uppercase tracking-[3px]">
                  <ShoppingBag size={12} />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
