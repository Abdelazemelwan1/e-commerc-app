import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom';
// import {QueryClient , QueryClientProvider } from '@tanstack/react-query';
// let client = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
        {/* <QueryClientProvider client={client}> */}

    <App />
        {/* </QueryClientProvider> */}


  </StrictMode>,
)
