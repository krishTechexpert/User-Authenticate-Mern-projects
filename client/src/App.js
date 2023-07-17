import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Profile from "./components/Profile";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import React from 'react';
/** Our app router */


function App() {
  const[isAuth,setIsAuth]=React.useState(false);
  const router =createBrowserRouter([
    {
    path:'/',
    element:<Login setIsAuth={setIsAuth} />
    },
    {
      path:'/register',
      element:<Register />
    },
    {
      path:'/profile',
      element:<Profile isAuth={isAuth} />
    },
    {
      path:'/forgot',
      element:<ForgotPassword />
    },
    {
      path:'/reset',
      element:<Reset />
    },
    {
      path:'*',
      element:<PageNotFound />
    } 
  ])
  
  return (
    <React.Fragment>
      <CssBaseline />
      <RouterProvider router={router} />
    </React.Fragment>
    
  );
}

export default App;
