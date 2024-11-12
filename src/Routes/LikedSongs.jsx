import LeftSidebar from "../Components/LeftSidebar";
import Navbar from "../Components/Navbar";
import RightSidebar from "../Components/RightSidebar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import Controls from "../Components/Controls";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import { PlayerContext } from "../Context/PlayerContext";
import { useSearched } from "../Context/SearchedContext";

export default function LikedSongs({ newName }) {
  const { user, displayName, setDisplayName, likedSongs, setLikedSongs } =
    useUser();
    const { togglePlayPause } = useContext(PlayerContext);
    const { isSearched } = useSearched();
  // const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Fetch liked songs when component mounts
  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/users/liked-songs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Log the response data to check
        setLikedSongs(response.data.likedSongs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
        setLoading(false);
      }
    };

    fetchLikedSongs();
  }, []);

  // if(isSearched){
  //   navigate('/');
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <LeftSidebar />
          <div className="middlePart flex justify-center  w-[100%] h-[77vh] pb-20 mt-[90px]">
            <div
              className=" w-[57%] h-[77vh] flex flex-col text-white shadow-xl shadow-blue-gray-900/5
              bg-clip-border rounded-xl" style={{backgroundColor:"#1B0025"}}
            >
              <div
                className="banner flex  h-[40%] lg:h-[50%] w-full p-2 bg-clip-border rounded-t-xl"
                style={{ backgroundColor: "#3e0652" }}
              >
                <div
                  className="PicleftSide relative w-[100px] -translate-y-6 lg:translate-y-0 h-[40%] lg:h-[70%]  flex flex-col justify-center self-end bg-neutral-800 transition-all"
                  style={{ borderRadius: "60%", minWidth: "25%" }}
                >
                  <FavoriteIcon
                    className={`my-8 justify-center self-center
                  `}
                    style={{ width: "60%", height: "60%", fill: "violet" }}
                  />
                </div>
                <div className="rightSide flex w-[75%] h-[65%] self-end gap-3 p-4 flex-col">
                  {/* <span className="no-underline text-white cursor-default" style={{textDecoration:"none"}}>{user.email}</span> */}
                  <div className="playlists_flw">
                    <span>Playlist</span>
                  </div>
                  <span
                    className="text-xl lg:text-5xl font-bold"
                    style={{ textDecoration: "none" }}
                  >
                    Liked Songs
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
                  {likedSongs.length > 0 ? (
                    likedSongs.map((song, index) => (
                      <div
                        key={index}
                        className="song-item h-14 rounded-lg hover:bg-[#6f32978b] cursor-pointer p-2 flex w-100 align-bottom my-2"
                        onClick={() => togglePlayPause(song.preview_url,song.id, song.name, song.artists)}
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
                                  .join(", ") // Join artists' names with a comma
                              : "Unknown Artist"}
                          </div>
                        </div>
                        <div className="w-56 text-sm">
                          {song.album?.name || "Unknown Album"}
                        </div>
                        {/* Song duration */}
                        <p>
                          {song.duration_ms
                            ? formatDuration(song.duration_ms)
                            : "N/A"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No liked songs yet</p>
                  )}
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
