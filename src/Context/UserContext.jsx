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
  const [playlists, setPlaylists] = useState([]);
  const [ newName, setNewName ] = useState('');


  const token = localStorage.getItem('token');



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

  console.log(playlists);

  const addToPlaylist = (track, playlistId) => {
    console.log('trackid : ', track.id);
    axios.put(`http://localhost:8000/api/v1/playlists/${playlistId}/add-song`, {
      songId: track.id,
      playlistId,
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // Handle success (e.g., update state or show a success message)
      console.log('Track added to playlist');
    })
    .catch(error => {
      console.error("Error adding to playlist", error);
    });
  };



  return (
    <UserContext.Provider value={{ user, setUser, displayName, setDisplayName, history, setHistory, likedSongs, setLikedSongs, playlists, setPlaylists, addToPlaylist, newName, setNewName }}>
      {children}
    </UserContext.Provider>
  );
};
