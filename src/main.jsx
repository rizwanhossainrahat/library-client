import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes.jsx'
import AuthProvider from './components/provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    <Toaster></Toaster>
    </AuthProvider>
    </QueryClientProvider>
   
    
  
)
