import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlaylistsPage from '../Routes/PlaylistsPage';


const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  console.log(playlistId);
  useEffect(() => {
    const fetchPlaylist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/playlists/${playlistId}/link`,
       
      );
      setPlaylist(response.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      // setLoading(false);
    }
  };

  fetchPlaylist();

  }, [playlistId]);

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (errorMessage) {
    return <p style={{ color: 'red' }}>{errorMessage}</p>;
  }

  return (
    <div>
      {playlist ? (
        <PlaylistsPage />

        
      ) : (
        <p>Loading playlist...</p>
      )}
    </div>
  );
};

export default PlaylistDetails;
