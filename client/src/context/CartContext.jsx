import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Dynamic keys based on user authentication
  const getCartKey = () => user ? `cart_${user._id}` : 'cart_guest';
  const getWishlistKey = () => user ? `wishlist_${user._id}` : 'wishlist_guest';

  // 1. Load cart/wishlist from local storage when user state changes (login/logout)
  useEffect(() => {
    const loadUserData = () => {
      const savedCart = localStorage.getItem(getCartKey());
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // SANITIZATION: Filter out items with old mock IDs (e.g., "1", "2")
        // MongoDB ObjectIds are 24-character hex strings
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
  }, [user]);

  // 2. Guest to User cart migration: merge guest items when they log in
  useEffect(() => {
    if (user && isInitialized) {
      const guestCartStr = localStorage.getItem('cart_guest');
      const guestWishlistStr = localStorage.getItem('wishlist_guest');
      
      if (guestCartStr) {
        const guestCart = JSON.parse(guestCartStr);
        if (guestCart.length > 0) {
          // Add guest items to user cart (avoiding duplicates by id)
          setCartItems(prevUserCart => {
            const newCart = [...prevUserCart];
            guestCart.forEach(guestItem => {
              const existingItem = newCart.find(i => i._id === guestItem._id);
              if (existingItem) {
                existingItem.quantity += guestItem.quantity || 1;
              } else {
                newCart.push(guestItem);
              }
            });
            return newCart;
          });
        }
        localStorage.removeItem('cart_guest'); // Clear guest cart after migration
      }

      if (guestWishlistStr) {
        const guestWishlist = JSON.parse(guestWishlistStr);
        if (guestWishlist.length > 0) {
          setWishlist(prevUserWishlist => {
            const newWishlist = [...prevUserWishlist];
            guestWishlist.forEach(guestItem => {
              if (!newWishlist.find(i => i._id === guestItem._id)) {
                newWishlist.push(guestItem);
              }
            });
            return newWishlist;
          });
        }
        localStorage.removeItem('wishlist_guest'); // Clear guest wishlist
      }
    }
  }, [user, isInitialized]);

  // 3. Save to local storage whenever cart or wishlist arrays mutate
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized, user]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized, user]);

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
