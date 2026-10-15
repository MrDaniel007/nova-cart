import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Account() {
  const navigate = useNavigate();
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Состояние модалки просмотра фото

  // Подгружаем имя и фото ТОЛЬКО для того юзера, который сейчас вошел
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        setUsername(localStorage.getItem(`userName_${uid}`) || '');
        setAvatarUrl(localStorage.getItem(`userAvatar_${uid}`) || '');
      }
    });
    return () => unsubscribe();
  }, []);

  // Сохраняем имя и фото персонально под UID пользователя
  const handleSave = (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const uid = currentUser.uid;
    localStorage.setItem(`userName_${uid}`, username);
    localStorage.setItem(`userAvatar_${uid}`, avatarUrl);

    window.dispatchEvent(new Event('storage'));
    toast.success('Профиль обновлен!');
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Вы вышли из аккаунта');
      navigate('/login');
    } catch (error) {
      toast.error('Ошибка при выходе');
    }
  };

  const currentPhoto = avatarUrl.trim() !== '' ? avatarUrl : defaultAvatar;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 pt-24">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Мой профиль</h2>

        {/* Аватарка (Клик для полноэкранного просмотра) */}
        <div className="flex flex-col items-center mb-6">
          <div 
            onClick={() => setIsPreviewOpen(true)}
            className="relative cursor-pointer group"
            title="Нажмите, чтобы открыть фото"
          >
            <img 
              src={currentPhoto} 
              alt="Avatar" 
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg group-hover:scale-105 transition duration-200"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-xs font-bold text-white">🔍 Открыть</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Нажмите на фото для просмотра</p>
        </div>

        {/* Форма редактирования */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1 font-medium">Имя пользователя</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1 font-medium">Ссылка на фото (URL)</label>
            <input 
              type="text" 
              value={avatarUrl} 
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://site.com/image.jpg"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-md shadow-blue-600/30 cursor-pointer"
          >
            Сохранить изменения
          </button>
        </form><button 
          onClick={handleLogout}
          className="w-full mt-6 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white font-semibold py-2.5 rounded-xl transition border border-red-600/40 cursor-pointer"
        >
          Выйти из аккаунта
        </button>
      </div>

      {/* Модальное окно просмотра фото на весь экран */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative max-w-lg w-full flex flex-col items-center">
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 cursor-pointer"
            >
              ✕
            </button>
            <img 
              src={currentPhoto} 
              alt="Full Avatar" 
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border-2 border-white/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}