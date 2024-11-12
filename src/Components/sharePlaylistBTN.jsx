import { useState } from 'react';
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share'; 


const SharePlaylist = ({ playlistId }) => {
  const [shareableLink, setShareableLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem("token");

  const handleShare = async() => {
    try{
      const response = await axios.put(
        `http://localhost:8000/api/v1/playlists/${playlistId}/share`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const getPlaylistByLink = `${window.location.origin}/playlist/${playlistId}/link`;
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
    <div className="text-center p-4 flex flex-col">
      <button
        onClick={handleShare}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        <ShareIcon className="text-purple-600" />
      </button>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {shareableLink && (
        <div className="mt-4">
          <p className="font-semibold mb-2 flex items-center gap-1">
            {/* <ShareIcon className="text-purple-600" /> Share Link: */}
          </p>
          <div className="flex items-center gap-2">
            {/* <input
              type="text"
              value={shareableLink}
              readOnly
              className="border border-gray-300 rounded-lg p-2 w-full text-gray-700 bg-gray-100"
            /> */}
            <span className='text-[20px] w-[100px] cursor-text' style={{textDecoration:"none"}}>Copy Link</span>
            <button
              onClick={copyToClipboard}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <ContentCopyIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePlaylist;
