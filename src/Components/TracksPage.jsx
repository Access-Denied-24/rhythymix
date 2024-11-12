import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import QueueList from "./QueueList";
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { useUser } from "../Context/UserContext";
import ArtistCard from "./artistCard";

export default function TracksPage({ tracks, setIsSearched }) {
  const {
    setQueue,
    setCurrentTrack,
    playTrack,
    setIsLooping,
    setIsPlaying,
    isPlaying,
    audioRef,
    togglePlayPause,
    activeTrackId,
    setDuration,
    queue,
    addToQueue,addCurrentDetails,
    currentTrackFullDetails, setCurrentTrackFullDetails
  } = useContext(PlayerContext);

  const { playlists, setPlaylists, addToPlaylist } = useUser();

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const songArtists = tracks.artists[0].artists.items[0];
  console.log('song art : ', songArtists);

  const songList = tracks.songs || [];
  console.log(songList);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.onloadedmetadata = () => {
        setDuration(audioElement.duration); // to set the duration in context
      };

      audioElement.ontimeupdate = () => {
       
      };
    }

    return () => {
      if (audioElement) {
        audioElement.onloadedmetadata = null;
        audioElement.ontimeupdate = null;
      }
    };
  }, [audioRef, setDuration]);

  const handleAddToPlaylist = (track) => {
    setSelectedTrack(track);
    setShowPlaylistModal(true); 
  };

  const handlePlaylistSelect = (playlistId) => {
    console.log('playlist ID : ',playlistId);
    setSelectedPlaylist(playlistId);
  };

  const handleAddToSelectedPlaylist = () => {
    console.log(selectedPlaylist, selectedTrack);
    if (selectedPlaylist && selectedTrack) {
      addToPlaylist(selectedTrack, selectedPlaylist);
      setShowPlaylistModal(false); // Closes modal after adding
    }
  };

  return (
    <>
      <div className="Cont flex flex-wrap justify-center w-[100%] mx-auto overflow-auto max-h-[76vh] ">
        {console.log('song : ',songList[0].artists)}
        <ArtistCard artist={songArtists} />
        {songList.map((element, index) => (
          <div key={index} className="m-4 flex justify-center">
            <div className="Card bg-neutral-900 border border-gray-200 shadow dark:bg-[#120018] p-2 rounded-xl dark:border-gray-700 relative w-[9rem] hover:scale-105 transform transition duration-300 ease-in-out">
              <a href="#">
                <img className="rounded-t-lg" src={element.album.images[0].url} alt={element.name} />
              </a>
              
              <div className="separator flex flex-col justify-between mt-2">
                <div className="songDetails p-1">
                  <a href="#">
                    <h5 className="songTitle mb-2 text-xl font-bold tracking-tight dark:text-white text-white">
                      {element.name}
                    </h5>
                  </a>
                  <p className="Artists mb-3 font-normal text-gray-500 dark:text-gray-400">
                    Artists: {element.artists.map(artist => artist.name).join(', ')}
                  </p>

                  <div className="flex justify-center space-x-2">
                    {/* Play/Pause Icon */}
                    <div
                      className="text-black bg-blue-500 p-2 rounded-full cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-700"
                      onClick={() => {
                        togglePlayPause(element.preview_url, element.id, element.name, element.artists);
                        addCurrentDetails(element.preview_url, element.id, element.name, element.artists,element.popularity,element.album.images[0].url,element.album.release_date,element.album.total_tracks, element.album.name);
                      }}
                    >
                      {activeTrackId === element.id && isPlaying ? (
                        <PauseCircleOutlineIcon className="text-white" />
                      ) : (
                        <PlayCircleOutlinedIcon className="text-white" />
                      )}
                    </div>

                    <div
                      className="text-black bg-green-500 p-2 rounded-full cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 hover:bg-green-700"
                      onClick={() => handleAddToPlaylist(element)}
                    >
                      <PlaylistAddIcon className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {showPlaylistModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
            <div className="bg-white p-4 rounded-lg w-[30vw] h-[90vh] flex flex-col text-center ">
              <h3 className="text-xl text-black mb-4">Select Playlist</h3>
              <div className="space-y-2 overflow-auto">
                {playlists.map((playlist) => (
                  <button
                    key={playlist._id}
                    
                    onClick={() => handlePlaylistSelect(playlist._id)}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                  >
                    {/* {console.log(playlist)} */}
                    {playlist.name}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setShowPlaylistModal(false)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToSelectedPlaylist}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
                >
                  Add to Playlist
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

