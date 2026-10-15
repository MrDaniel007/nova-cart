import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/wishlistContext.jsx'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';

export default function Header({ searchQuery, setSearchQuery }) {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Состояние для бургер-меню
const [avatarUrl, setAvatarUrl] = useState('');
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // Отслеживаем авторизацию и сразу берем фото ИМЕННО ЭТОГО юзера по его UID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setAvatarUrl(localStorage.getItem(`userAvatar_${currentUser.uid}`) || '');
      } else {
        setAvatarUrl(''); // если вышел из аккаунта — сбрасываем аватарку
      }
    });
    return () => unsubscribe();
  }, []);

  // Мгновенно обновляем фото при нажатии «Сохранить» в профиле
  useEffect(() => {
    const handleStorageChange = () => {
      if (auth.currentUser) {
        setAvatarUrl(localStorage.getItem(`userAvatar_${auth.currentUser.uid}`) || '');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Вы вышли из аккаунта');
      setIsOpen(false);
    } catch (error) {
      toast.error('Ошибка выхода');
    }
  };

  const currentAvatar = avatarUrl.trim() !== '' ? avatarUrl : defaultAvatar;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white md:bg-white/30 md:backdrop-blur-md border-b border-gray-200 md:border-white/20 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-white/40 to-orange-500/10 -z-10 blur-2xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Логотип */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold text-2xl sm:text-3xl text-blue-600 drop-shadow-sm">
              nova-cart
            </Link>
          </div>

          {/* Поиск для ПК (скрыт на мобилках) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-full py-2 pl-5 pr-10 focus:ring-2 focus:ring-orange-500/50 focus:border-transparent outline-none transition-all shadow-sm placeholder-gray-400 text-sm"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              /> 
              {searchQuery?.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery && setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-lg font-bold p-1 leading-none cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Навигация для ПК */}
          <nav className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/product" className="hover:text-blue-600 transition-colors">Products</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </nav>{/* Иконки и авторизация для ПК */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="relative cursor-pointer text-2xl" title="Избранное">
              ❤️
              {wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative cursor-pointer text-2xl" title="Корзина">
              🛒
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Если вошел — показываем только круглый аватар с переходом в профиль */}
            {user ? (
              <Link to="/account" title="Личный кабинет">
                <img 
                  src={currentAvatar} 
                  alt="Account" 
                  className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 hover:scale-105 transition duration-200 shadow"
                />
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-semibold text-blue-600 hover:text-orange-500">
                Войти
              </Link>
            )}
          </div>

          {/* Кнопка Бургер-меню для мобилок */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative cursor-pointer text-xl">
              🛒
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Мобильная выпадающая панель (Drawer) справа */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 md:hidden flex justify-end">
          <div className="w-[85%] max-w-[320px] bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-gray-200">
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <span className="font-bold text-xl text-blue-600">Меню</span>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 font-bold text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Поиск мобильный */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-orange-500/50 outline-none text-sm"value={searchQuery || ''}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                />
                {searchQuery?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery && setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-sm font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Навигация */}
              <nav className="flex flex-col space-y-4 font-semibold text-gray-700">
                <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Home</Link>
                <Link to="/product" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">Products</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600 transition">About</Link>
                
                {user && (
                  <Link to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:text-blue-600 transition py-1">
                    <img src={currentAvatar} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-blue-500" />
                    <span>Личный кабинет</span>
                  </Link>
                )}

                <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center justify-between hover:text-orange-500 transition py-1">
                  <span>Избранное</span>
                  {wishlist?.length > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center justify-between hover:text-blue-600 transition py-1">
                  <span>Корзина</span>
                  {cart?.length > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </nav>
            </div>

            {/* Авторизация мобильная */}
            <div className="border-t border-gray-100 pt-4">
              {user ? (
                <button 
                  onClick={handleLogout} 
                  className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition cursor-pointer"
                >
                  Выйти из аккаунта
                </button>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 text-center bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
                >
                  Войти
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  )
}