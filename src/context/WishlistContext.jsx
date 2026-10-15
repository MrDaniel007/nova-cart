import { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
 const [wishlist, setWishlist] = useState(() => {
const saved = localStorage.getItem('nova_wishlist');
return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
}, [wishlist]);

const toggleWishlist = (product) => {
setWishlist((prevWishlist) => {
const exists = prevWishlist.some((item) => item.id === product.id);
if (exists) {
return prevWishlist.filter((item) => item.id !== product.id);
} else {
return [...prevWishlist, product];
}
});
};

  const isFavorite = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isFavorite }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);