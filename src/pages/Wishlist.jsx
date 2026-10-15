import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist()
  const { toggleCart, isInCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <main className="container mx-auto px-4 pt-28 pb-16 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">В избранном пока пусто</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Сохраняйте понравившиеся товары, чтобы не потерять их.
          </p>
          <Link 
            to="/product" 
            className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
          >
            Перейти к каталогу
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 pt-28 pb-16 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Избранное</h1>
        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Товаров: {wishlist.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const inCart = isInCart(item.id)

          return (
            <div 
              key={item.id} 
              className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Кнопка удаления из избранного */}
              <button
                type="button"
                onClick={() => toggleWishlist(item)}
                className="absolute top-6 right-6 z-10 text-lg p-2 rounded-full bg-white/90 backdrop-blur-sm shadow hover:scale-110 transition cursor-pointer"
                title="Удалить из избранного"
              >
                ❤️
              </button>

              <Link to={`/product/${item.id}`} className="block">
                <div className="overflow-hidden rounded-xl mb-3">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" 
                  />
                </div>
                <h2 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{item.title}</h2>
                <p className="text-orange-500 font-extrabold text-lg mb-3">
                  {Number(item.price || 0).toFixed(2)} сом
                </p>
              </Link>

              {/* Кнопка добавления в корзину */}
              <button
                type="button"
                onClick={() => toggleCart(item)}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                  inCart
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20'
                }`}
              >
                {inCart ? 'В корзине ✓' : 'В корзину 🛒'}
              </button>
            </div>
          )
        })}
      </div>
    </main>
  )
}