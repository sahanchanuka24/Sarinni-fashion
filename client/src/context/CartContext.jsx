import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const getCartKey = () => 'cart_guest';
  const getWishlistKey = () => 'wishlist_guest';

  // 1. Load cart/wishlist from local storage
  useEffect(() => {
    const loadUserData = () => {
      const savedCart = localStorage.getItem(getCartKey());
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const validCart = parsedCart.filter(item => 
          item._id && typeof item._id === 'string' && item._id.length === 24
        );
        setCartItems(validCart);
      } else {
        setCartItems([]);
      }
      
      const savedWishlist = localStorage.getItem(getWishlistKey());
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        const validWishlist = parsedWishlist.filter(item => 
          item._id && typeof item._id === 'string' && item._id.length === 24
        );
        setWishlist(validWishlist);
      } else {
        setWishlist([]);
      }
      setIsInitialized(true);
    };

    loadUserData();
  }, []);

  // 2. Save to local storage whenever cart or wishlist arrays mutate
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item._id === product._id);
      if (isItemInCart) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) return prev.filter(item => item._id !== product._id);
      return [...prev, product];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      wishlist, 
      addToCart, 
      removeFromCart, 
      toggleWishlist,
      clearCart,
      cartCount,
      wishlistCount: wishlist.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
