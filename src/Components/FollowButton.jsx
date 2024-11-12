import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Context/UserContext';

const FollowButton = ({ artistId }) => {
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user && user.followedArtists) {
      setIsFollowing(user.followedArtists.includes(artistId));
    }
  }, [user, artistId]);

  const handleFollowUnfollow = async () => {
    if (!user) {
      setError('You must be logged in to follow artists');
      return;
    }

    try {
      console.log('Artist ID being sent:', artistId); 
      const apiUrl = isFollowing
        ? 'http://localhost:8000/api/v1/users/unfollow'
        : 'http://localhost:8000/api/v1/users/follow';

      const response = await axios.post(
        apiUrl,
        { artistId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setIsFollowing(!isFollowing);
        setError(''); // Clear error on success
      }
    } catch (error) {
      console.error('Error following/unfollowing artist:', error);
      setError(
        isFollowing
          ? 'Failed to unfollow artist. Please try again later.'
          : 'Failed to follow artist. Please try again later.'
      );
    }
  };

  return (
    <div className="flex items-center">
  <button
    onClick={handleFollowUnfollow}
    className={`text-xl bg-purple-700 m-1 w-full p-1 rounded-3xl  font-semibold ${isFollowing ? 'text-red-500' : 'text-gray-300 bg-'} hover:text-red-400 transition-all duration-300`}
  >
    {isFollowing ? 'Unfollow' : 'Follow'}
  </button>
  {error && <span className="text-red-400 text-sm ml-2">{error}</span>}
</div>

  );
};

export default FollowButton;
