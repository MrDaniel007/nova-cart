import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

export default function ProductDetail() {
  // 1. Вытаскиваем id из URL
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Делаем запрос к API по ID
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        // Запрос к бекенду за конкретным товаром
        const res = await api.get(`/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Загрузка товара...</div>;
  if (error || !product) return <div className="text-center py-20 text-red-500">Товар не найден!</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-indigo-600 hover:underline flex items-center gap-2 cursor-pointer"
      >
        ← Назад к каталогу
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-lg">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-80 object-cover rounded-xl"
        />
        
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description || 'Описание товара отсутствует.'}</p>
          </div>
          
          <div>
            <span className="text-3xl font-bold text-indigo-600 block mb-4">
              {Number(product.price).toFixed(2)} сом
            </span>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition cursor-pointer">
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}