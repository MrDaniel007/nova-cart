import { useState, useEffect} from 'react'
import { api, addProduct, updateProduct, deleteProduct } from '../api/api'

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    useEffect(() => {
        api.get('/product').then((res) => setProducts(res.data));
    }, [])
      const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!title || !price || !image) {
          alert('Please fill in all fields');
          return;
        }
        try {
            const newProductObj = {
                title,
                price: Number(price),
                image: image || 'https://via.placeholder.com/150'
            };

            const createdItem = await addProduct(newProductObj);
            setProducts((prev) => [createdItem, ...prev]);
            setTitle('');
            setPrice('');
            setImage('');
        }  catch (error) {
            console.error('Error adding product:', error);
        }; }
        const handleDeleteProduct = async (id) => {
    if (!confirm('Точно удалить товар?')) return;

    try {
      // Удаляем на бэкенде
      await deleteProduct(id);

      // Фильтруем стейт: оставляем только те товары, у которых ID НЕ равен удаленному
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };
  const handleEditTitle = async (id, currentTitle) => {
    const newTitle = prompt('Введите новое название товара:', currentTitle);
    if (!newTitle) return;

    try {
      // Отправляем измененное название на бэкенд
      const updatedItem = await updateProduct(id, { title: newTitle });

      // Обновляем стейт React через .map()
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (err) {
      console.error('Ошибка редактирования:', err);
    }
  };
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Управление товарами (NovaCart Admin)</h1>

      {/* ФОРМА ДОБАВЛЕНИЯ (CREATE) */}
      <form onSubmit={handleAddProduct} className="bg-gray-50 p-6 rounded-2xl mb-10 max-w-lg border">
        <h2 className="text-xl font-bold mb-4">Добавить новый товар</h2>
        
        <input
          type="text"
          placeholder="Название товара"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-3 border rounded-xl"
        />
        
        <input
          type="number"
          placeholder="Цена (сом)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 mb-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Ссылка на картинку (URL)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
        >
          + Добавить в БД
        </button>
      </form>

      {/* СПИСОК ТОВАРОВ ДЛЯ УДАЛЕНИЯ / РЕДАКТИРОВАНИЯ (READ, UPDATE, DELETE) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Все товары в базе ({products.length})</h2>
        {products.map((item) => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.price} сом</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditTitle(item.id, item.title)}
                className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 text-sm font-medium"
              >
                ✏️ Изменить
              </button>
              <button
                onClick={() => handleDeleteProduct(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
     
}

