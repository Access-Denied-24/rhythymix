import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Home from './Routes/Home';
import Login from './Routes/Signup Pages/Login';
import ForgotPass from './Routes/Signup Pages/ForgotPass';
import Signup from './Routes/Signup Pages/Signup';
import { useState, useEffect, useContext } from 'react';
import ProfilePage from './Routes/ProfilePage';
import Preloader from './Components/Preloader';
import TracksPage from './Components/TracksPage';
import Modal from './Components/Modal';
import Interests from './Routes/Interests';
import Settings from './Routes/Settings';
import Navbar from './Components/Navbar';
import LikedSongs from './Routes/LikedSongs'
import SongHistory from './Routes/SongHistory';
import { UserProvider } from './Context/UserContext';
import { SearchProvider } from './Context/SearchedContext';
import { PlayerContextProvider } from './Context/PlayerContext';
import PlaylistsPage from './Routes/PlaylistsPage';
import ResetPassword from './Components/ResetPass';
import Album from './Routes/Album';
import PlaylistDetails from './Components/playlistByLink';

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
    path: "/likedsongs",
    element: <LikedSongs />
  },
  {
    path: "/songhistory",
    element: <SongHistory />
  },
  {
    path: "/resetPassword/:token",
    element: <ResetPassword/>
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
  },
  {
    path: "/playlist/:playlistId",
    element: <PlaylistsPage />
  },
  {
    path: "/album/:albumId",
    element: <Album />
  }
  ,
  {
    path: "/playlist/:playlistId/link",
    element: <PlaylistDetails/>
  }
]);

function App() {
  // const {audioRef} = useContext(PlayerContext);
  
  return (
    <UserProvider>
      <SearchProvider>
        <PlayerContextProvider>

          <div className='App'>
            <RouterProvider router = {router} />
          </div>
        </PlayerContextProvider>
        
      </SearchProvider>
    </UserProvider>
  );
}

export default App
