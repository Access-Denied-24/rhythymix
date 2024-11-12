import Navbar from "../Components/Navbar";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import Preloader from "../Components/Preloader";
import { useState, useEffect, useContext } from "react";
import Controls from "../Components/Controls";
import ToastNotif from "../Components/SuccessMsg";
import TracksPage from "../Components/TracksPage";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function PlaylistsPage() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const { playlistId } = useParams(); // Replace with dynamic playlist ID
  // console.log(playlistId);

  const token = localStorage.getItem("token");

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // http://localhost:8000/api/v1/playlists/:playlistId/remove-song

  const handleRemoveSong = async(songId) => {
    try{
      console.log("Attempting to remove song:", songId, "from playlist:", playlistId);

      const response = await axios.put(`http://localhost:8000/api/v1/playlists/${playlistId}/remove-song`, {songId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Response from backend:", response.data);

      setPlaylist((prevPlaylist) => ({
        ...prevPlaylist,
        songDetails: prevPlaylist.songDetails.filter(
          (song) => song.id !== songId
        ),
      }))
    } catch(err){
      console.log('Error : ', err);
    }


  }

  useEffect(() => {
    // Fetch playlist details on component mount
    const fetchPlaylist = async () => {
      try {
        console.log(playlistId);

        const response = await axios.get(
          `http://localhost:8000/api/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response : ", response);
        setPlaylist(response.data); // Save playlist data to state
      } catch (err) {
        setError("Failed to fetch playlist");
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
            
                </div>
                <div className="rightSide flex w-[75%] h-[80%] self-end gap-3 p-4 flex-col ">
                 
                  <span className="cursor-text" style={{ textDecoration: "none" }}>Playlist • {user.username}</span>
                  <span
                    className="text-5xl font-bold"
                    style={{ textDecoration: "none" }}
                  >
                    {playlist.name}
                  </span>

                  <span
                    className="text-xl font-bold"
                    style={{ textDecoration: "none" }}
                  >
                    {playlist.description}
                  </span>
                </div>
              </div>
              <div>
                <div className="liked-songs-list px-3">
                  <div className="song-item flex w-100 h-10 align-bottom mt-4 -mb-4">
                    <div className="w-8 text-center ml-12 mr-4">#</div>
                    <div className="inline w-56 mx-2 text-xs">Title</div>
                    <div className="w-52 mx-3 text-xs">Album</div>
                    <span className="cursor-text" style={{textDecoration:"none"}} >Duration</span>
                  </div>
                 

                  <div className="overflow-auto h-[200px]">
                    {console.log(playlist)}

                    {playlist &&
                    playlist.songDetails &&
                    playlist.songDetails.length > 0 ? (
                      playlist.songDetails.map((song, index) => (
                        <div
                          key={index}
                          className="group song-item h-14 rounded-lg hover:bg-[#6f32978b] cursor-pointer p-2 flex w-full align-bottom my-2"
                        >
                          <div className="w-8 text-center ml-10 mr-5 pt-2">
                            {index + 1}
                          </div>

                          <img
                            src={song.album?.images[0]?.url || ""}
                            width="40"
                            height="40"
                            className="inline w-10 rounded"
                          />

                          <div className="inline w-48 mx-2">
                            <div className="font-semibold text-md">
                              {song.name}
                            </div>
                            <div className="font-thin text-xs">
                              {song.artists && song.artists.length > 0
                                ? song.artists
                                    .map((artist) => artist.name)
                                    .join(", ")
                                : "Unknown Artist"}
                            </div>
                          </div>

                          <div className="w-56 text-sm">
                            {song.album?.name || "Unknown Album"}
                          </div>

                          <p>
                            {song.duration_ms
                              ? formatDuration(song.duration_ms)
                              : "N/A"}
                          </p>

                          <RemoveCircleOutlineIcon className="text-neutral-500 fill-black opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out items-end" style={{ color: "rgba(0, 0, 0, 0.3)" }} 
                          onClick={() => handleRemoveSong(song.id)}
                          />
                        </div>
                        
                      ))
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