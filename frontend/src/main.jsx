import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import { ToastContainer } from "react-toastify";
import store from './store/store.js'
import { Provider } from 'react-redux'
import AuthLayout from './components/AuthLayout.jsx';
import Login from './pages/Login.jsx';
import GenerateReport from './pages/GenerateReport.jsx';
import InterviewReport from './pages/InterviewReport.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/generate-report",
        element: (
          <AuthLayout authentication>
            <GenerateReport />
          </AuthLayout>
        )
      },
      {
        path: "/interview-report/:reportId",
        element: (
          <AuthLayout authentication>
            <InterviewReport />
          </AuthLayout>
        )
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    // transition={Bounce}
    />
  </StrictMode>,
)
