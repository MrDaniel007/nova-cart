import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nova_cart', JSON.stringify(cart));
  }, [cart]);

  // ДОБАВЛЯЕМ НЕДОСТАЮЩУЮ ФУНКЦИЮ TOGGLECART:
  const toggleCart = (product) => {

    if (!auth.currentUser) {
toast.error('Для добавления в корзину нужно войти в аккаунт!');
window.location.href = '/login';
return;
}


    setCart((prevCart) => {
      const exists = prevCart.some((item) => item.id === product.id);
      if (exists) {
        return prevCart.filter((item) => item.id !== product.id);
      } else {
        return [...prevCart, product];
      }
    });
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider value={{ cart, toggleCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);