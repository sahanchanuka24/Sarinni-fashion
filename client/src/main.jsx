import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import axios from 'axios'

// Set default axios base URL for all requests
const isProduction = import.meta.env.PROD;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || (isProduction ? 'https://sarinni-fashion-production.up.railway.app/api' : 'http://localhost:5050/api');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
