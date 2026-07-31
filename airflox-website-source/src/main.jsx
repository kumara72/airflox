import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { QuoteCartProvider } from './context/QuoteCartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QuoteCartProvider>
        <App />
      </QuoteCartProvider>
    </BrowserRouter>
  </StrictMode>,
)
