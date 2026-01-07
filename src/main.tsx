import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with public key from environment variables
emailjs.init({
  publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
