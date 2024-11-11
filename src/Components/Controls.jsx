import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../Context/PlayerContext';
import RepeatIcon from '@mui/icons-material/Repeat';
import { PauseCircleIcon } from '@heroicons/react/24/outline';
import { AddCircle } from '@mui/icons-material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function Controls() {

  const {
    currentTrack, setCurrentTrack,
      isLooping, toggleLooping, toggleShuffle,
      isPlaying, togglePlayPause,
      play, pause, seek, currentTime,
      duration, setQueue, audioRef, isShuffled,
      nextTrack, previousTrack, addToQueue
  } = useContext(PlayerContext);

  const [ isLiked, setIsLiked ] = useState(false);

  // {console.log(currentTrack)}


  // const {
  //   isShuffled, toggleShuffle
  // } = useContext(PlayerContext);

  const handleSeekChange = (event) => {
    seek(Number(event.target.value));
  }

  const handleVolumeChange = (event) => {
    audioRef.current.volume = event.target.value / 100;
  }

  const handleAddToQueue = () => {
    addToQueue(currentTrack);
  }
  
  // const handlePlayPause = () => {
    //   if (currentTrack && currentTrack.preview_url && currentTrack.id) {
      //     console.log("Playing track:", currentTrack);
      //     togglePlayPause(currentTrack.preview_url, currentTrack.id, currentTrack.name);
      //   } else {
        //     console.error("Track or track details are missing");
        //   }
        // }
        
        // const handlePlayPause = () => {
        //   if (currentTrack && currentTrack.preview_url && currentTrack.id) {
        //     console.log('Playing track:', currentTrack);

        //     togglePlayPause(currentTrack.preview_url, currentTrack.id, currentTrack.name,);
        //   } else {
        //     console.error('Track or track details are missing:', currentTrack);
        //   }
        // };
        
        
          useEffect(() => {
            // console.log('Current track details:', currentTrack);
          }, [currentTrack]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  } 
        
        
  return (
    <div className="controlsCont bg-neutral-900 h-[70px] flex z-1 fixed left-0 right-0 bottom-0 py-1">
      <div className='SongDetails p-2 w-[22%] flex justify-between'>
        <div className='flex w-[80%]'>
          <img src="/playlistPhoto1.webp" alt="" className='w-[15%] mr-4' />
          <div className='flex flex-col'>
            {/* {console.log(currentTrack)} */}
            {/* <span className='text-white'>{currentTrack || 'No track Playing'}</span> */}
            <span className='text-white'>{currentTrack ? currentTrack.name : 'No track Playing'}</span>
            {/* <span className='text-white'>{isPlaying ? currentTrack : 'No track Playing'}</span> */}

            {/* <span>Artists name</span> */}
            {/* <span className='text-white'>{currentTrack ? currentTrack.artists : 'No artists'}</span> */}
            {/* <span className='text-white'>{currentTrack ? currentTrack.artists.join(', ') : 'No artist available'}</span> */}
            <span className='text-white'>
    {Array.isArray(currentTrack?.artists) 
      ? currentTrack.artists.join(', ') 
      : currentTrack?.artists || 'No artist available'}
  </span>
        </div>

        </div>
       
        {currentTrack ? (
          <FavoriteOutlinedIcon className='text-white' onClick={handleLike} style={{
            fill: isLiked ? 'pink' : 'white'
          }} />
          
        ) : (
          ''
        )}
      </div>
      <div className='msControls w-[56%] flex flex-col justify-center content-center gap-1'>
        <div className=' w-[30%] flex justify-between self-center'>
          <ShuffleIcon className={`cursor-pointer ${isShuffled ? 'text-blue-500 fill-blue-500 bg-green-500' : ''}`} onClick={toggleShuffle} />
          <SkipPreviousIcon className={`cursor-pointer`} onClick={previousTrack} />

          {/* {console.log('curr :', currentTrack)} */}
          {
            isPlaying ? (
              <PauseCircleIcon className='w-[30px]' onClick={() => togglePlayPause(currentTrack.preview_url, currentTrack.id, currentTrack.name)} />
              ) : (
                
              <PlayCircleIcon onClick={() => togglePlayPause(currentTrack.preview_url, currentTrack.id, currentTrack.name)} />
                
              // <PlayCircleIcon className='cursor-pointer' onClick={() => togglePlayPause(currentTrack?.preview_url, currentTrack?.id, currentTrack?.name)} 
            )
          }
          {/* {console.log('New log : ' , currentTrack.preview_url, currentTrack.id, currentTrack.name)} */}

          <SkipNextIcon className='cursor-pointer' onClick={nextTrack} />
          <RepeatIcon className={`cursor-pointer ${isLooping ? 'bg-green-500' : ''}`} onClick={toggleLooping} />

          <AddCircle className="add-to-queue" onClick={handleAddToQueue} />
        </div>
        
        <div className='flex justify-center w-[50%]text-center gap-1 items-center'>
          {/* <span>0:00</span> */}
          {/* <div className="flex w-[60%] h-[3px]  bg-neutral-700 rounded-full dark:bg-white border-none cursor-pointer">
          </div>
          <span>3:00</span> */}
          <span>{formatTime(currentTime)}</span>
          <input type="range" min="0" max={duration || 0} 
            value={currentTime} onChange={handleSeekChange}
            className="w-[60%] h-[3px]  bg-neutral-600 rounded-full dark:bg-white border-none self-center cursor-pointer"
          />
          <span>{formatTime(duration)}</span>
        </div>


      </div>
      <div className='Options w-[22%] flex'>
        <div className='flex justify-center w-full self-center'>
          <VolumeUpIcon style={{width:"40px", cursor:"pointer"}} />
          {/* <div className="flex w-[60%] h-[3px]  bg-neutral-600 rounded-full dark:bg-white border-none self-center cursor-pointer"> */}
          <input type="range" min="0" max="100" onChange={handleVolumeChange} defaultValue='20' className="w-[60%] h-[3px]  bg-neutral-600 rounded-full dark:bg-white border-none self-center cursor-pointer" />
            {/* </div> */}

        </div>
      </div>
    </div>
  )
}

function formatTime(time){
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

}