import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root.jsx';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import Orders from './Components/Orders.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Profile from './Components/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'orders',
        element: <PrivateRoute><Orders></Orders></PrivateRoute> // Redirect to home page if no match found
      },
      {
        path:'profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute> // Redirect to home page if no match found
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
   
  </StrictMode>,
)
