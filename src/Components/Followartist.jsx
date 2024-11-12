import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const FollowedArtistsPage = () => {
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchFollowedArtists = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/v1/users/followed-artist', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setFollowedArtists(response.data.followedArtists);
        } else {
          setError('Failed to fetch followed artists');
        }
      } catch (err) {
        console.error('Error fetching followed artists:', err);
        setError('An error occurred while fetching followed artists');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedArtists();
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Followed Artists</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress color="primary" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {followedArtists.map((artist, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Artist Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={artist.artist.imageUrl || 'https://via.placeholder.com/150'}
                  alt={artist.artist.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>

              {/* Artist Name */}
              <h2 className="text-xl font-semibold text-center">{artist.artist.name}</h2>

              <div className="mt-4">
                <p className="text-gray-400 text-center">Albums:</p>
                <ul className="list-disc pl-6 mt-2">
                  {artist.albums.length > 0 ? (
                    artist.albums.map((album, albumIndex) => (
                      <li key={albumIndex} className="text-gray-300">
                        {album.name}
                      </li>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center flex items-center justify-center">
                      <FontAwesomeIcon icon={faMusic} className="mr-2" />
                      No albums found
                    </div>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowedArtistsPage;
