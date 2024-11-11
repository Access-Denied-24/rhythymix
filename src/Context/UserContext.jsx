import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  let [ displayName, setDisplayName ] = useState('');
  const [history, setHistory] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);



  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
        // console.log(data.email);
        setDisplayName(data.username);
        console.log(`fetched user data : ` + user);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfile();
  }, []);



  return (
    <UserContext.Provider value={{ user, setUser, displayName, setDisplayName, history, setHistory, likedSongs, setLikedSongs }}>
      {children}
    </UserContext.Provider>
  );
};
