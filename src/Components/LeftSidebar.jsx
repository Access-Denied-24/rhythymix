import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { PlayerContext } from '../Context/PlayerContext';
import CreatePlaylist from './CreatePlaylist';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function LeftSidebar(){
  // const [playlists, setPlaylists] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playlists, setPlaylists } = useUser();


  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage.");
    return;
  }
  useEffect(() => {
      const fetchPlaylists = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/playlists/getPlaylists", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }); // Assuming this is your endpoint
          const playlistData = response.data;
          setPlaylists(response.data);
          console.log(playlistData);
          } catch (error) {
          console.error("Error fetching playlists:", error.response || error.message);
          }
      };
      fetchPlaylists();
  }, []);

  const { history, setHistory, likedSongs, setLikedSongs } = useUser();
  // const { isLiked }
  // const {  } = 

  const toggleModal = () => setIsModalOpen(!isModalOpen);


  // const handleCreatePlaylist = () => {
  //   setShowCreateForm(true);  // Show the Create Playlist form
  // };

  const handlePlaylistCreated = (newPlaylist) => {
    setPlaylists([...playlists, newPlaylist]);  // Add the new playlist to the list
    setShowCreateForm(false);  // Hide the form after playlist is created
  };


  return (
    <>
  {/* <div className="relative flex flex-col bg-clip-border rounded-xl bg-neutral-800 text-white h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"> */}
  <div className="absolute left-0 top-[89px] bottom-[10%] overflow-auto flex flex-col bg-clip-border rounded-xl  text-white w-60 p-4 shadow-xl shadow-blue-gray-900/5" style={{backgroundColor:"#1B0025", minWidth:"100px",}}>
    <div className="mb-2 p-4">
      <h5 className="block antialiased tracking-normal font-sans text-xl leading-snug text-white font-bold">
        Your Playlists
      </h5>
    </div>
   <button onClick={toggleModal} className="p-2 bg-blue-600 text-white rounded-lg">Create Playlist</button>
      
      {isModalOpen && (
        <CreatePlaylist onClose={toggleModal} onPlaylistCreated={handlePlaylistCreated}  />
      )}

{console.log(playlists)}



    <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-white">
    <Link to='/likedsongs'>
      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 
        focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex w-[20%] mr-4 ">
          <img src="/likedSongsIcon.webp" alt="" className='rounded-sm' />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Liked Songs</span>
          <span style={{textDecoration:"none"}}>Playlist • {likedSongs.length} songs</span>
          {/* {console.log(likedSongs.length)} */}
        </div>
      </div>
      </Link>
      <Link to='/songhistory'>
      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex mr-4 w-[40px] h-[40px] ">
          <MusicNoteIcon style={{width: "100%", height:"100%"}} />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Song History</span>
          <span style={{textDecoration:"none"}}>Playlist • {history.length} songs</span>
        </div>
      </div>
      </Link>

      {/* <ul>
      {Array.isArray(playlists) && playlists.length > 0 ? (
        playlists.map((playlist) => (
          <li key={playlist._id}>
            {/* Check for name and show 'Loading...' if undefined 
            {playlist?.name || 'Loading...'}
          </li>
            ))
          ) : (
            <li>No playlists available</li>
          )}
    </ul> */}

<ul>
  {Array.isArray(playlists) && playlists.length > 0 ? (
    playlists.map((playlist) => (
      <Link to={`/playlist/${playlist._id}`} key={playlist._id}>
        <li className="group flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80 justify-between">
          <div className="flex mr-4 w-[40px] h-[40px]">
            <MusicNoteIcon style={{ width: "100%", height: "100%" }} />
          </div>
          <div className='flex flex-col'>
            <span className='text-[18px]' style={{ textDecoration: "none" }}>
              {playlist?.name || 'Loading...'}
            </span>
            <span style={{ textDecoration: "none" }}>
              {/* You can add more details here like song count if available */}
              Playlist • {playlist.songs?.length || 0} songs
            </span>
          </div>
          <RemoveCircleOutlineIcon className="text-neutral-500 fill-black opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            style={{ color: "rgba(0, 0, 0, 0.3)" }} />
        </li>
      </Link>
            ))
          ) : (
            <li>No playlists available</li>
          )}
    </ul>


      <Link to="/playlist">
        <div
          role="button"
          tabIndex={0}
          className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
          >
          <div className="flex mr-4 w-[40px] h-[40px] ">
            <MusicNoteIcon style={{width: "100%", height:"100%"}} />
          </div>
          <div className='flex flex-col'>
            <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
            <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
          </div>
        </div>
      </Link>

      <Link to="/playlist">
        <div
          role="button"
          tabIndex={0}
          className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
        >
          <div className="flex mr-4 w-[40px] h-[40px] ">
            <MusicNoteIcon style={{width: "100%", height:"100%"}} />
          </div>
          <div className='flex flex-col'>
            <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
            <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
          </div>
            
        </div>
      </Link>

      
    </nav>
  </div>
   
    </>
  );
}