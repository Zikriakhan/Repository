import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const DEFAULT_INITIAL_CART = [
  {
    name: 'Calzone',
    category: 'Pizzas',
    variationName: 'Small',
    price: 'AED17.00',
    numPrice: 17.00,
    calories: '580 Cal.',
    desc: 'Pizza Sandwich - The king of sandwiches! Contains tomato, mozzarella, Salami, Chicken, Mushroom and capsicum / ساندوتش بيتزا - ملك السندويشات! يحتوي على طماطم وجبن موزاربلا، سلامي، دجاج، مشروم وفلفل',
    ingredients: 'Prepared fresh in our scratch kitchen using premium ingredients, signature spices, and fresh herbs.',
    allergens: 'Wheat, Milk, Eggs',
    img: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1000&auto=format&fit=crop',
    quantity: 1,
    specialInstructions: 'Extra crispy crust'
  }
];

export function CartProvider({ children }) {
  // Try to load cart from local storage on mount
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('lelegance_cart');
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Could not load cart data", e);
    }
    return DEFAULT_INITIAL_CART;
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

  const updateItemVariation = (itemName, oldVariationName, newVariation) => {
    setCartItems(prev => prev.map(item => {
      if (item.name === itemName && item.variationName === oldVariationName) {
        return {
          ...item,
          variationName: newVariation.name,
          numPrice: newVariation.numPrice,
          price: `AED${newVariation.numPrice.toFixed(2)}`
        };
      }
      return item;
    }));
  };

  const updateItemBakeLevel = (itemName, variationName, newBakeLevel) => {
    setCartItems(prev => prev.map(item => {
      const matchVariation = item.variationName === variationName || (!item.variationName && !variationName);
      if (item.name === itemName && matchVariation) {
        const title = typeof newBakeLevel === 'object' ? newBakeLevel.title : newBakeLevel;
        const subtitle = typeof newBakeLevel === 'object' ? (newBakeLevel.subtitle || '') : '';
        return {
          ...item,
          bakeLevel: title,
          bakeLevelSub: subtitle,
          specialInstructions: `Bake Level: ${title}${subtitle ? ` (${subtitle})` : ''}`
        };
      }
      return item;
    }));
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
    updateItemVariation,
    updateItemBakeLevel,
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
