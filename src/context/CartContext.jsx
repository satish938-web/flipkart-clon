import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity of existing item
        const updatedItems = prevCart.items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        // Add new item
        const newItem = { ...product, quantity };
        const updatedItems = [...prevCart.items, newItem];
        
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== productId);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};