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
// import ResetPass from './Components/ResetPass';
// import respas from './Components/respas';

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
    element: <Signup />
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

  }
]);


//   function App() {
//     const CLIENT_ID = "02f6fc454aa14fd798a7fefece58e496";
//     const REDIRECT_URI = "localhost:5173";
//     const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
//     const RESPONSE_TYPE = "token";

    

//   return (
//     <div className='App'>
//       {/* <Preloader /> */}
      //  <RouterProvider router = {router} />
//       /*<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} style={{color:"white"}}>login</a> */
//     </div>
//   )
// }

function App() {
//   const [ isLoading, setIsLoading ] = useState(true);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     setIsLoading(false);
//   }, 2000);

//   return () => clearTimeout(timer);
// }, []);

return (
  <div className='App'>
  {/* {isLoading ? <Preloader /> :  
  } */}
  <RouterProvider router = {router} />
  </div>
);
}

export default App
