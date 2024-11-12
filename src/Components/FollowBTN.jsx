import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useUser } from '../Context/UserContext';

const FollowButton = ({ artistId }) => {
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (user && user.followedArtists) {
      setIsFollowing(user.followedArtists.includes(artistId));
    }
  }, [user, artistId]);
  
  const token = localStorage.getItem('token');

  const handleFollowUnfollow = async () => {
    if (!user) {
      setError('You must be logged in to follow artists');
      return;
    }

    try {
      const apiUrl = isFollowing ?
       'http://localhost:8000/api/v1/users/unfollow' : 'http://localhost:8000/api/v1/users/follow';

      const response = await axios.post(
        apiUrl,
        { artistId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.status === 200) {
        setIsFollowing(!isFollowing);
        setError(''); 
      }
    } catch (error) {
      console.error('Error following/unfollowing artist:', error);
      setError(isFollowing ? 'Failed to unfollow artist. Please try again later.' : 'Failed to follow artist. Please try again later.');
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleFollowUnfollow}
        className={`text-xl ${isFollowing ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-all duration-300`}
      >
        <FavoriteIcon fontSize="inherit" />
      </button>
      {/* Show error message if there's an error */}
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </div>
  );
};

export default FollowButton;
