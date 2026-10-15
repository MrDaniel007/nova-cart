import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-900 via-indigo-800 to-slate-900 flex items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Декоративные фоновые свечения */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-lg w-full text-center bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-12 rounded-3xl shadow-2xl">
        {/* Фирменный гигантский 404 с плавающей иконкой */}
        <div className="relative inline-block mb-6">
          <h1 className="text-8xl sm:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-white drop-shadow-md">
            404
          </h1>
          {/* Иконка сумки/корзины, которая "левитирует" */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl animate-bounce">
            🛍️
          </div>
        </div>

        {/* Текст ошибки */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Страница улетела из корзины!
        </h2>
        <p className="text-indigo-200 text-sm sm:text-base mb-8 max-w-sm mx-auto">
          Кажется, этой страницы больше не существует или вы ввели неверный адрес.
        </p>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium transition duration-200 cursor-pointer"
          >
            ← Назад
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-indigo-500/30 transition duration-200 cursor-pointer text-center"
          >
            На главную Nova Cart
          </Link>
        </div>

        {/* Фирменный копирайт внизу карточки */}
        <p className="mt-8 text-xs text-indigo-300/60">
          nova-cart store • status 404
        </p>
      </div>
    </main>
  );
}