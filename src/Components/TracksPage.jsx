import { useContext, useEffect } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import QueueList from "./QueueList";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

export default function TracksPage({ tracks, setIsSearched }) {
  // console.log('tracks data :', tracks.songs);
  const { setQueue, setCurrentTrack, playTrack, setIsLooping, setIsPlaying, isPlaying, audioRef, togglePlayPause, activeTrackId, setDuration, queue, addToQueue } = useContext(PlayerContext);


  const songList = tracks.songs || [];

  // const handleTrackSelection = (track) => {
  //   setCurrentTrack(track);  // This updates currentTrack in PlayerContext
  // };

  // useEffect(() => {
  //   setQueue(songList.map(track => track.preview_url));
  // }, [tracks.songs, setQueue]);

  // const handlePlay = (track) => {
  //   setCurrentTrack(track.name);
  //   // setIsLooping(false);
  //   // playTrack(trackURL);
  //   setIsPlaying(true);
  //   togglePlayPause(track.preview_url, track.id, track.name);
  // }

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      // Update the duration once the audio metadata is loaded
      audioElement.onloadedmetadata = () => {
        setDuration(audioElement.duration);  // Set the duration in context
      };

      // Optional: If you need to update the duration again while the song plays
      audioElement.ontimeupdate = () => {
        // Optionally update the current time or handle other time-based features
      };
    }

    return () => {
      // Clean up the event listener when the component is unmounted
      if (audioElement) {
        audioElement.onloadedmetadata = null;
        audioElement.ontimeupdate = null;
      }
    };
  }, [audioRef, setDuration]);
  

  return (
    <>
      <div className="Cont flex flex-wrap justify-center w-[100%] mx-auto overflow-auto max-h-[70vh] z-5">
        {songList.map((element, index) => (
          <div key={index} className="m-4 flex justify-center">
            <div className="Card bg-white border border-gray-200  shadow dark:bg-[#120018] p-2 rounded-xl dark:border-gray-700" style={{ width: "9rem", }} >
              <a href="#">
                <img className="rounded-t-lg" src={element.album.images[0].url} alt={element.name} />
              </a>
              
              <div className="separator flex flex-col justify-between">

                <div className="songDetails p-1">
                  <a href="#">
                    <h5 className="songTitle mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {element.name}
                    </h5>
                  </a>
                <p className="Artists mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Artists : {element.artists.map(artist => artist.name).join(', ')}
                </p>
                
                <div className=" flex justify-center">
                  {/* <button role="button" className="text-black border w-[50%]"
                    onClick={handlePlay(element.preview_url)}
                  >
                    Play
                  </button> */}
                  {/* <button
            onClick={() => togglePlayPause(element.id, element.preview_url)} // Pass track ID and URL
          >
            {activeTrackId === element.id ? 'Pause' : 'Play'}
          </button> */}
                    <div className="text-black"
                    onClick={() => togglePlayPause(element.preview_url, element.id, element.name, element.artists)} // Pass track URL and ID
                    >

                    {activeTrackId === element.id && isPlaying ? <PauseCircleOutlineIcon className="cursor-pointer mr-5"/> : <PlayCircleOutlinedIcon className="cursor-pointer"/> }
                    </div>
                    <QueueMusicIcon className="cursor-pointer ml-5" onClick={() => addToQueue(element)}/>

                  {/* <audio preload="auto" controls></audio> */}
                </div>
              </div>
            </div>
            
            </div>
          </div>
        ))}

        <QueueList />
      </div>
    </>
  );
}
 

/*
playlist
  create - name, desc, public/private

  bngya : display like liked playlist with remove button

  left panel : getPlaylist map, playlist=id

  
*/