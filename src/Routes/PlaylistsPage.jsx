import Navbar from "../Components/Navbar";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import { useState, useEffect, useContext } from "react";
import Controls from "../Components/Controls";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { PlayerContext } from "../Context/PlayerContext";
import SharePlaylist from "../Components/sharePlaylistBTN";
import { useSearched } from "../Context/SearchedContext";


export default function PlaylistsPage() {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const { isSearched } = useSearched();
  const { togglePlayPause, addCurrentDetails, currentTrackFullDetails } = useContext(PlayerContext);

  const { playlistId } = useParams(); // to replace with dynamic playlist ID in url
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
        setPlaylist(response.data); 
      } catch (err) {
        setError("Failed to fetch playlist");
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchPlaylist();
  }, [playlistId]); 

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // if(isSearched){
  //   navigate('/');
  // }

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
                className="banner flex h-[50%] lg:h-[270px] w-full p-2 bg-clip-border rounded-t-xl "
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
                <SharePlaylist playlistId={playlistId}/>
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
                        console.log('song : ', song),
                        <div
                          key={index}
                          className="group song-item h-14 rounded-lg hover:bg-[#6f32978b] cursor-pointer p-2 flex w-full align-bottom my-2"
                          onClick={() => {togglePlayPause(song.preview_url, song.id, song.name, song.artists);
                          addCurrentDetails(song.preview_url, song.id, song.name, song.artists,song.popularity,song.album.images[0].url,song.album.release_date,song.album.total_tracks, song.album.name);
                          }}
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
                      <p className="text-center p-4">No songs added yet!</p>
                    )}
                  </div>
                </div>
                {/* <SharePlaylist /> */}
                
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