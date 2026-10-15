import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку, если проскроллили больше 200px
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-2xl hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
      aria-label="Scroll to top"
    >
      ↑ Наверх
    </button>
  );
}