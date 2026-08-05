import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { AdminDataProvider } from './context/AdminDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminDataProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AdminDataProvider>
  </StrictMode>,
)

