import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const cleanEmail = email.trim();
const cleanPassword = password.trim();

if (!cleanEmail || !cleanPassword) {
toast.error('Заполните все поля!')
return;
}

if (cleanPassword.length < 6) {
toast.error('Пароль должен быть не менее 6 символов!')
return;
}

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Добро пожаловать обратно!')
      navigate('/')
    } catch (err) {
      toast.error('Ошибка входа: неверный email или пароль')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-50 max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Вход в <span className="text-blue-600">nova-cart</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Пароль</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Еще нет аккаунта?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:text-orange-500 transition">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </main>
  )
}