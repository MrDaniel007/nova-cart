import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    const cleanEmail = email.trim();
const cleanPassword = password.trim();

if (!cleanEmail || !cleanPassword) {
toast.error('Заполните все поля!')
return;
}

if (cleanPassword.length < 6) {
toast.error('Пароль должен содержать минимум 6 символов!')
return;
}

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('Аккаунт успешно создан!')
      navigate('/')
    } catch (err) {
      toast.error('Ошибка регистрации: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-50 max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Регистрация в <span className="text-blue-600">nova-cart</span>
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:text-orange-500 transition">
            Войти
          </Link>
        </p>
      </div>
    </main>
  )
}