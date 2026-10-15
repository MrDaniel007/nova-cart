import { useState, useEffect } from 'react'
import { api } from '../api/api'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/wishlistContext' 


export default function Product({ searchQuery = '' }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { toggleCart, isInCart } = useCart()
  const { toggleWishlist, isFavorite } = useWishlist()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await api.get('/product')
        setProducts(res.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const cleanQuery = String(searchQuery || '').toLowerCase().trim()

  const filteredProducts = products.filter((item) => {
    const itemTitle = String(item?.title || item?.name || '').toLowerCase()
    return itemTitle.includes(cleanQuery)
  })

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 font-medium text-gray-600">Loading products...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md mx-auto border border-red-100">
          <p className="font-bold text-lg mb-2">Error Server</p>
          <p className="text-sm font-medium text-gray-700">Error: {error}</p>
        </div>
      </main>
    )
  }

  if (products.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12 text-center">
        <div className="bg-gray-50 p-8 rounded-2xl max-w-md mx-auto">
          <p className="text-gray-500 font-medium">The products are currently unavailable 📦</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products Nova</h1>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            const inCart = isInCart(item.id)
            const favorite = isFavorite(item.id)

            return (
              <div 
                key={item.id} 
                className="relative transition duration-300 ease-in-out transform hover:scale-105 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Кнопка Сердечко (Избранное) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleWishlist(item)
                  }}
                  className="absolute top-6 right-6 z-10 text-lg p-2 rounded-full bg-white/80 backdrop-blur-sm shadow hover:scale-110 transition"
                >
                  {favorite ? '❤️' : '🤍'}
                </button>

                {/* Кликабельная область для перехода на карточку товара */}
                <Link to={`/product/${item.id}`} className="block">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover rounded-xl mb-3" 
                  />
                  <h2 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{item.title}</h2>
                  <p className="text-gray-900 font-bold mb-3">
                    {Number(item.price || 0).toFixed(2)} сом
                  </p>
                </Link>{/* Кнопка В корзину */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleCart(item)
                  }}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium transition ${
                    inCart
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {inCart ? 'В корзине ✓' : 'В корзину 🛒'}
                </button>
              </div>
            )
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">Ничего не найдено</p>
        )}
      </section>
    </main>
  )
}