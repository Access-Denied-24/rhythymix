import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Home from './Routes/Home';
import Login from './Routes/Signup Pages/Login';
import ForgotPass from './Routes/Signup Pages/ForgotPass';
import Signup from './Routes/Signup Pages/Signup';
import { useState, useEffect } from 'react';
import ProfilePage from './Routes/ProfilePage';
import Preloader from './Components/Preloader';
import TracksPage from './Components/TracksPage';
import Modal from './Components/Modal';
import Interests from './Routes/Interests';
import Settings from './Routes/Settings';
import Navbar from './Components/Navbar';
// import ResetPass from './Components/ResetPass';
// import respas from './Components/respas';
import { UserProvider } from './Context/UserContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/forgotpass",
    element: <ForgotPass />
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup/interests",
    element: <Interests />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/resetpass/:token",
    element: <respas />
  },
  {
    path: "/modal",
    element: <Modal />
  },
  {
    path: "/interests",
    element: <Interests />
  },
  {
    path: "/settings",
    element: <Settings />
  }
]);

function App() {

  return (
    <UserProvider>
      <div className='App'>
        <RouterProvider router = {router} />
      </div>
    </UserProvider>
  );
}

export default App
