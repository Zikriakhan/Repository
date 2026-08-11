import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // Try to load cart from local storage on mount
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('lelegance_cart');
      if (storedCart) {
        return JSON.parse(storedCart);
      }
    } catch (e) {
      console.error("Could not load cart data", e);
    }
    return [];
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('lelegance_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      // Find existing item by matching BOTH name and variationName
      const existingItemIndex = prev.findIndex(i => 
        i.name === item.name && 
        i.variationName === item.variationName
      );
      
      const addQty = item.quantity || 1;

      if (existingItemIndex >= 0) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + addQty,
          specialInstructions: item.specialInstructions || updatedCart[existingItemIndex].specialInstructions
        };
        return updatedCart;
      }

      const numPrice = item.numPrice !== undefined ? item.numPrice : parseFloat((item.price || "AED0").replace(/[^0-9.-]+/g, ""));

      return [...prev, { ...item, quantity: addQty, numPrice }];
    });
  };

  const removeFromCart = (itemName, variationName) => {
    setCartItems(prev => prev.filter(item => !(item.name === itemName && item.variationName === variationName)));
  };

  const updateQuantity = (itemName, variationName, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(prev => prev.map(item =>
      (item.name === itemName && item.variationName === variationName) ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.numPrice * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
