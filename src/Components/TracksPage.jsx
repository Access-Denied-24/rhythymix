// import { useContext, useEffect } from "react";
// import { PlayerContext } from "../Context/PlayerContext";
// import QueueList from "./QueueList";
// import QueueMusicIcon from '@mui/icons-material/QueueMusic';
// import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
// import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

// export default function TracksPage({ tracks, setIsSearched }) {
//   // console.log('tracks data :', tracks.songs);
//   const { setQueue, setCurrentTrack, playTrack, setIsLooping, setIsPlaying, isPlaying, audioRef, togglePlayPause, activeTrackId, setDuration, queue, addToQueue } = useContext(PlayerContext);


//   const songList = tracks.songs || [];

//   // const handleTrackSelection = (track) => {
//   //   setCurrentTrack(track);  // This updates currentTrack in PlayerContext
//   // };

//   // useEffect(() => {
//   //   setQueue(songList.map(track => track.preview_url));
//   // }, [tracks.songs, setQueue]);

//   // const handlePlay = (track) => {
//   //   setCurrentTrack(track.name);
//   //   // setIsLooping(false);
//   //   // playTrack(trackURL);
//   //   setIsPlaying(true);
//   //   togglePlayPause(track.preview_url, track.id, track.name);
//   // }

//   useEffect(() => {
//     const audioElement = audioRef.current;

//     if (audioElement) {
//       // Update the duration once the audio metadata is loaded
//       audioElement.onloadedmetadata = () => {
//         setDuration(audioElement.duration);  // Set the duration in context
//       };

//       // Optional: If you need to update the duration again while the song plays
//       audioElement.ontimeupdate = () => {
//         // Optionally update the current time or handle other time-based features
//       };
//     }

//     return () => {
//       // Clean up the event listener when the component is unmounted
//       if (audioElement) {
//         audioElement.onloadedmetadata = null;
//         audioElement.ontimeupdate = null;
//       }
//     };
//   }, [audioRef, setDuration]);
  

//   return (
//     <>
//       <div className="Cont flex flex-wrap justify-center w-[100%] mx-auto overflow-auto max-h-[70vh] z-5">
//         {songList.map((element, index) => (
//           <div key={index} className="m-4 flex justify-center">
//             <div className="Card bg-white border border-gray-200  shadow dark:bg-[#120018] p-2 rounded-xl dark:border-gray-700" style={{ width: "9rem", }} >
//               <a href="#">
//                 <img className="rounded-t-lg" src={element.album.images[0].url} alt={element.name} />
//               </a>
              
//               <div className="separator flex flex-col justify-between">

//                 <div className="songDetails p-1">
//                   <a href="#">
//                     <h5 className="songTitle mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
//                     {element.name}
//                     </h5>
//                   </a>
//                 <p className="Artists mb-3 font-normal text-gray-700 dark:text-gray-400">
//                   Artists : {element.artists.map(artist => artist.name).join(', ')}
//                 </p>
                
//                 <div className=" flex justify-center">
//                   {/* <button role="button" className="text-black border w-[50%]"
//                     onClick={handlePlay(element.preview_url)}
//                   >
//                     Play
//                   </button> */}
//                   {/* <button
//             onClick={() => togglePlayPause(element.id, element.preview_url)} // Pass track ID and URL
//           >
//             {activeTrackId === element.id ? 'Pause' : 'Play'}
//           </button> */}
//                     <div className="text-black"
//                     onClick={() => togglePlayPause(element.preview_url, element.id, element.name, element.artists)} // Pass track URL and ID
//                     >

//                     {activeTrackId === element.id && isPlaying ? <PauseCircleOutlineIcon className="cursor-pointer mr-5"/> : <PlayCircleOutlinedIcon className="cursor-pointer"/> }
//                     </div>
//                     <QueueMusicIcon className="cursor-pointer ml-5" onClick={() => addToQueue(element)}/>

//                   {/* <audio preload="auto" controls></audio> */}
//                 </div>
//               </div>
//             </div>
            
//             </div>
//           </div>
//         ))}

//         <QueueList />
//       </div>
//     </>
//   );
// }
 

// /*
// playlist
//   create - name, desc, public/private

//   bngya : display like liked playlist with remove button

//   left panel : getPlaylist map, playlist=id

  
// */

// import { useContext, useEffect } from "react";
// import { PlayerContext } from "../Context/PlayerContext";
// import QueueList from "./QueueList";
// // import QueueMusicIcon from '@mui/icons-material/QueueMusic';
// import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
// import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
// import QueueMusicIcon from '@mui/icons-material/QueueMusic';

// export default function TracksPage({ tracks, setIsSearched }) {
//   const { setQueue, setCurrentTrack, playTrack, setIsLooping, setIsPlaying, isPlaying, audioRef, togglePlayPause, activeTrackId, setDuration, queue, addToQueue } = useContext(PlayerContext);

//   const songList = tracks.songs || [];

//   useEffect(() => {
//     const audioElement = audioRef.current;

//     if (audioElement) {
//       audioElement.onloadedmetadata = () => {
//         setDuration(audioElement.duration);  // Set the duration in context
//       };

//       audioElement.ontimeupdate = () => {
//         // Optionally update the current time or handle other time-based features
//       };
//     }

//     return () => {
//       if (audioElement) {
//         audioElement.onloadedmetadata = null;
//         audioElement.ontimeupdate = null;
//       }
//     };
//   }, [audioRef, setDuration]);

//   return (
//     <>
//       <div className="Cont flex flex-wrap justify-center w-[100%] mx-auto overflow-auto max-h-[70vh] z-5">
//         {songList.map((element, index) => (
//           <div key={index} className="m-4 flex justify-center">
//             <div className="Card bg-zinc-400 border border-gray-200 shadow dark:bg-[#120018] p-2 rounded-xl dark:border-gray-700 relative w-[9rem] hover:scale-105 transform transition duration-300 ease-in-out">
//               <a href="#">
//                 <img className="rounded-t-lg" src={element.album.images[0].url} alt={element.name} />
//               </a>
              
//               <div className="separator flex flex-col justify-between mt-2">
//                 <div className="songDetails p-1">
//                   <a href="#">
//                     <h5 className="songTitle mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
//                       {element.name}
//                     </h5>
//                   </a>
//                   <p className="Artists mb-3 font-normal text-gray-700 dark:text-gray-400">
//                     Artists: {element.artists.map(artist => artist.name).join(', ')}
//                   </p>
                
//                   {/* <div className="flex justify-center space-x-4 bg-neutral-500">
//                     {/* Play/Pause Icon *
//                     <div
                    
//                       className="text-black bg-blue-500 cursor-pointer transform transition duration-300 ease-in-out hover:scale-110"
//                       onClick={() => togglePlayPause(element.preview_url, element.id, element.name, element.artists)}
//                     >
//                       {/* <PlayCircleOutlinedIcon /> 
//                       {activeTrackId === element.id && isPlaying ? (
//                         <PauseCircleOutlineIcon className="mr-5 bg-neutral-500" />
//                       ) : (
//                         <PlayCircleOutlinedIcon className="bg-neutral-500"/>
//                       )}
//                     </div>

//                     {/* Add to Playlist Icon *
//                     <PlaylistAddIcon className="" />
//                   </div> */}

//                 <div className="flex justify-center space-x-2">
//                   {/* Play/Pause Icon */}
//                   <div
//                     className="text-black bg-blue-500 p-2 rounded-full cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-700"
//                     onClick={() => togglePlayPause(element.preview_url, element.id, element.name, element.artists)}
//                   >
//                     {activeTrackId === element.id && isPlaying ? (
//                       <PauseCircleOutlineIcon className="text-white" />
//                     ) : (
//                       <PlayCircleOutlinedIcon className="text-white" />
//                     )}
//                   </div>

//                   {/* Add to Playlist Icon */}
//                   <div
//                     className="text-black bg-green-500 p-2 rounded-full cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 hover:bg-green-700"
//                     onClick={() => addToQueue(element)} // Assuming addToQueue function exists
//                   >
//                     <QueueMusicIcon className="text-white" />
//                   </div>
//                   <div className="text-black bg-green-500 p-2 rounded-full cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 hover:bg-green-700">
//                     <PlaylistAddIcon />
//                   </div>
//                 </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         <QueueList />
//       </div>
//     </>
//   );
// }

import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import QueueList from "./QueueList";
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { useUser } from "../Context/UserContext";

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
    addToQueue,
  } = useContext(PlayerContext);

  const { playlists, setPlaylists, addToPlaylist } = useUser();

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const songList = tracks.songs || [];

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.onloadedmetadata = () => {
        setDuration(audioElement.duration); // Set the duration in context
      };

      audioElement.ontimeupdate = () => {
        // Optional: If you need to update the current time or handle other time-based features
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
    setShowPlaylistModal(true); // Open modal to select playlist
  };

  const handlePlaylistSelect = (playlistId) => {
    console.log('playlist ID : ',playlistId);
    setSelectedPlaylist(playlistId);
  };

  const handleAddToSelectedPlaylist = () => {
    console.log(selectedPlaylist, selectedTrack);
    if (selectedPlaylist && selectedTrack) {
      // Assuming addToPlaylist is a function that adds the track to the selected playlist
      addToPlaylist(selectedTrack, selectedPlaylist);
      setShowPlaylistModal(false); // Close modal after adding
    }
  };

  return (
    <>
      <div className="Cont flex flex-wrap justify-center w-[100%] mx-auto overflow-auto max-h-[70vh]">
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
                      onClick={() => togglePlayPause(element.preview_url, element.id, element.name, element.artists)}
                    >
                      {activeTrackId === element.id && isPlaying ? (
                        <PauseCircleOutlineIcon className="text-white" />
                      ) : (
                        <PlayCircleOutlinedIcon className="text-white" />
                      )}
                    </div>

                    {/* Add to Playlist Icon */}
                    <div
                      className="text-black bg-green-500 p-2 rounded-full cursor-pointer transform transition duration-300 ease-in-out hover:scale-110 hover:bg-green-700"
                      onClick={() => handleAddToPlaylist(element)} // Open playlist selection modal
                    >
                      <PlaylistAddIcon className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Playlist Selection Modal */}
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

        <QueueList />
      </div>
    </>
  );
}

