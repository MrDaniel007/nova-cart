import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, toggleCart } = useCart()

  // Считаем общую сумму
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price || 0), 0)

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 pt-28 pb-16 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Корзина пуста</h2>
          <p className="text-gray-500 mb-6 text-sm">Добавьте что-нибудь из каталога, чтобы сделать заказ.</p>
          <Link 
            to="/product" 
            className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
          >
            Перейти к товарам
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров (занимает 2 колонки) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between gap-4 hover:shadow-md transition"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-100 flex-shrink-0" 
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-base mb-1 truncate">{item.title}</h3>
                <p className="text-orange-500 font-extrabold text-lg">
                  {Number(item.price || 0).toFixed(2)} сом
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleCart(item)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
                title="Удалить товар"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Блок итогов (правая колонка, как в Ozon) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Ваш заказ</h2>
          
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Товары ({cart.length}):</span>
            <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} сом</span>
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-900 text-lg">Итого:</span>
            <span className="font-extrabold text-2xl text-blue-600">{totalPrice.toFixed(2)} сом</span>
          </div>

          <button
            type="button"
            onClick={() => alert('Оформление заказа в разработке!')}
            className="w-full py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition cursor-pointer"
          >
            Перейти к оформлению
          </button>
        </div>
      </div>
    </main>
  )
}