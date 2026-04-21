import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#3d0b18',
            color: '#fff7e5',
            border: '1px solid rgba(212, 175, 55, 0.25)',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
