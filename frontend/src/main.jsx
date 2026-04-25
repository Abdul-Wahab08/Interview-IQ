import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
  <StrictMode>
    <App />
  </StrictMode>,
  </RouterProvider>
)
