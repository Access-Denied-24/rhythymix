import React, { useState } from 'react';
import axios from 'axios';

const SharePlaylist = ({ playlistId }) => {
  const [shareableLink, setShareableLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleShare = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/playlists/share/${playlistId}`);

      // Generate the frontend link based on the playlist ID
      const getPlaylistByLink = `${window.location.origin}/playlist/${playlistId}`;
      setShareableLink(getPlaylistByLink);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to share playlist. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div>
      <button onClick={handleShare}>Share Playlist</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {shareableLink && (
        <div>
          <p>Shareable Link:</p>
          <input type="text" value={shareableLink} readOnly />
          <button onClick={copyToClipboard}>Copy Link</button>
        </div>
      )}
    </div>
  );
};

export default SharePlaylist;
