import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>,
)
