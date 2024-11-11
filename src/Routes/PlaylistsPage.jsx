import Navbar from "../Components/Navbar";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import Preloader from "../Components/Preloader";
import { useState, useEffect, useContext } from "react";
import Controls from "../Components/Controls";
import ToastNotif from "../Components/SuccessMsg";
import TracksPage from "../Components/TracksPage";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext";


export default function PlaylistsPage() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const playlistId = useParams(); // Replace with dynamic playlist ID
  // console.log(playlistId);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch playlist details on component mount
    const fetchPlaylist = async () => {
      try {
        // const token = localStorage.getItem('authToken');
        console.log(playlistId);

        const response = await axios.get(`http://localhost:8000/api/v1/playlists/${playlistId.playlistId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log('response : ',response);
        setPlaylist(response.data); // Save playlist data to state
      } catch (err) {
        setError('Failed to fetch playlist');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchPlaylist();
  }, [playlistId]); // Re-run if playlistId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex flex-col h-[100vh]">
        <Navbar />
        <div className="flex flex-grow">
          <LeftSidebar />
          <div className="middlePart flex justify-center items-start w-[100%] h-[77vh] pb-20 mt-[90px]">
            <div
              className=" w-[10%] lg:w-[57%] h-[77vh] min-w-[57%] min-h-[100%] flex flex-col text-white shadow-xl shadow-blue-gray-900/5
          bg-clip-border rounded-xl
          "
              style={{ backgroundColor: "#1B0025" }}
            >
              <div
                className="banner flex h-[40%] lg:h-[270px] w-full p-2 bg-clip-border rounded-t-xl"
                style={{ backgroundColor: "#3e0652" }}
              >
                <div
                  className="PicleftSide relative w-[100px] h-[40%] lg:h-[70%] flex flex-col justify-center self-end bg-neutral-800 transition-all"
                  style={{ borderRadius: "60%", minWidth: "25%" }}
                >
                  {/* <HistoryIcon className={`my-8 justify-center self-center
                  `}
                    style={{ width: "60%", height: "60%", fill: "violet" }}
                  /> */}
                </div>
                <div className="rightSide flex w-[75%] h-[65%] self-end gap-3 p-4 flex-col">
                  {/* <span className="no-underline text-white cursor-default" style={{textDecoration:"none"}}>{user.email}</span> */}
                  <div className="playlists_flw">
                    <span>Playlist</span>
                  </div>
                  <span
                    className="text-5xl font-bold"
                    style={{ textDecoration: "none" }}
                  >
                    History
                  </span>
                  <div className="playlists_flw">
                    <span
                      className="cursor-text"
                      style={{ textDecoration: "none" }}
                    >
                      {user.username}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="liked-songs-list px-5">
                  <div className="song-item flex w-100 h-10 align-bottom mt-4 -mb-4">
                    <div className="w-8 text-center ml-12 mr-4">#</div>
                    <div className="inline w-56 mx-2 text-xs">Title</div>
                    <div className="w-52 mx-3 text-xs">Album</div>
                    {/* Song duration */}
                    <span>Duration</span>
                  </div>

                  <div className="overflow-auto h-[200px]">
                  {playlist ? (
                    <div >
                      <h2>{playlist.name}</h2>
                      <p>{playlist.description}</p>
                      <ul>
                        {console.log(playlist)}
                        {playlist.songDetails && playlist.songDetails.map((song, index) => (
                          <li key={index}>{song.name}</li>
                          
                        ))}
                      </ul>
                    </div> 
                    )
                     : (
                      <p>No Played songs yet</p>
                      )}
                      </div>
                </div>
              </div>
              </div>
              </div>
          <RightSidebar />
        </div>
      </div>

      <Controls />
    </>
  );
}

{/* <div className="border h-[50%]" >
            {playlist ? (
              <div>
                <h2>{playlist.name}</h2>
                <p>{playlist.description}</p>
                <ul>
                  {console.log(playlist)}
                  {playlist.songDetails && playlist.songDetails.map((song, index) => (
                    <li key={index}>{song.name}</li>
                    
                  ))}
                </ul>
              </div> 
            */}