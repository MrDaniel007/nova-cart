import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Ждём, пока Firebase проверит сессию пользователя
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

      // Сравниваем почту (приводим к нижнему регистру и убираем пробелы для надежности)
      if (user && user.email?.trim().toLowerCase() === ADMIN_EMAIL?.trim().toLowerCase()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false); // Проверка завершена, выключаем загрузку
    });

    return () => unsubscribe();
  }, []);

  // Пока Firebase проверяет данные, показываем заглушку, чтобы не было ложного редиректа
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center font-bold text-xl">
        Проверка доступа...
      </div>
    );
  }

  // Если не админ — выкидываем на главную
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Если всё совпало — пускаем в админку
  return children;
}