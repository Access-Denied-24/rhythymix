import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const PlayerContext = createContext();


export const PlayerContextProvider = ({ children }) => {
  const [ currentTrack, setCurrentTrack ] = useState(null);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ queue, setQueue ] = useState([]);
  const [ isShuffled, setIsShuffled ] = useState(false);
  const [ isLooping, setIsLooping ] = useState(false);
  const [ currentTime, setCurrentTime ] = useState(0);
  const [ duration, setDuration ] = useState(0);
  const audioRef = useRef(new Audio());
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [ isLiked, setIsLiked ] = useState(false);
  const [ currentTrackFullDetails, setCurrentTrackFullDetails ] = useState([]);


  const token = localStorage.getItem('token')

  const playTrack = (trackURL) => {
    console.log('Playing track URL : ', trackURL);

    const audio = audioRef.current;
    console.log('playing...');

    axios.post('http://localhost:8000/api/v1/users/addToHistory',{
      songId: currentTrack.id,
    })
    .then(response => {
      console.log('Song added to history:', response.data);
    })
    .catch(error => {
      console.log('Error addding track', error);
    });


    if(audio.paused === false) audio.pause();

    if(audioRef.current.src !== trackURL){
      audioRef.current.src = trackURL;
    }

    audio.addEventListener('canplaythrough', () => {
      audio.play().catch((error) => {
        console.log('Error playing the track1 :', error);
      })
    });

    audio.addEventListener('error', (error) => {
      console.log('Error loading the track :', error);
    })

    // audioRef.current.play();
    setIsPlaying(true);
  }

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  const addCurrentDetails = (trackURL, trackId, trackName, trackArtists, trackPop, albumImg, releaseDate, totalTracks, albumName) => {
    console.log('track full details : ', trackURL, trackId, trackName, trackPop, albumImg, releaseDate, totalTracks);

    if (activeTrackId !== trackId) {
     
      setCurrentTrackFullDetails({ id: trackId, name: trackName, preview_url: trackURL, artists: trackArtists, pop: trackPop, trackimg: albumImg, releaseDate: releaseDate, totaltracks: totalTracks, albumName: albumName });
      
      setActiveTrackId(trackId);
    }

  }

  const togglePlayPause = (trackURL, trackId, trackName, trackArtists) => {
    console.log('Track Details : ', trackURL, trackId, trackName, trackArtists);

    const audio = audioRef.current;
    
    if (!trackURL) {
      console.log("Invalid track URL:", trackURL);
      return;
    }

    if (!audio) {
      console.error("Audio element not found");
      return;
    }


    if (activeTrackId !== trackId) {
      audio.src = trackURL;
      // setCurrentTrack(trackName); // Set current track name
      setCurrentTrack({ id: trackId, name: trackName, preview_url: trackURL, artists: trackArtists });
      setActiveTrackId(trackId);
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Error playing the track:", error));
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch((error) => console.log('Error resuming the track:', error));
        setIsPlaying(true);
      }
    }

    axios.post('http://localhost:8000/api/v1/users/addToHistory',{
      songId: trackId,
    },{
      headers: {
        Authorization: `Bearer ${token}`,  // Set the token in headers
      }
    }
    )
    .then(response => {
      console.log('Song added to history:', response.data);
    })
    .catch(error => {
      console.log('Error addding track', error);
    });
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  // to manage track time update
  useEffect(() => {
    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    audioRef.current.addEventListener('timeupdate', updateTime);
    audioRef.current.addEventListener('loadmetadata', () => setDuration(audioRef.current.duration));
    
    return () => {
      audioRef.current.removeEventListener('timeupdate', updateTime);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
  
    const handleMetadataLoad = () => {
      setDuration(audio.duration);
    };
  
    audio.addEventListener('loadedmetadata', handleMetadataLoad);
  
    // Cleanup listener on unmount
    return () => {
      audio.removeEventListener('loadedmetadata', handleMetadataLoad);
    };
  }, []);

  // shuffle tracks
  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    console.log('shuffle toggled :', isShuffled);
    const randomTrack = queue[Math.floor(Math.random() * queue.length)];
    setCurrentTrack(randomTrack);
    console.log(randomTrack);
    playTrack(randomTrack.preview_url);
  }

  // loop tracks
  // const toggleLooping = () => {
  //   setIsLooping(!isLooping);
  //   console.log('Looping :', isLooping);
  //   // if(isLooping) setCurrentTrack(currentTrack);
  //   setCurrentTrack(currentTrack);
  //   playTrack(currentTrack);
  // }
  const toggleLooping = () => {
    setIsLooping(prevState => {
      const newState = !prevState;
      console.log('Looping:', newState);
      
      // Set the current track to the looped track if looping is enabled
      setCurrentTrack(currentTrack);
      
      // Play the track
      // playTrack(currentTrack);
  
      return newState;
    });
  };
  


  
  const nextTrack = () => {
    if (!currentTrack || queue.length === 0) {
      console.log("No track to play next.");
      return;
    }

    let nextTrack = null;

    if (isShuffled) {
      const randomTrack = queue[Math.floor(Math.random() * queue.length)];
      setCurrentTrack(randomTrack);
      playTrack(randomTrack.preview_url);
    } else {
      const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
      if (currentIndex === -1) return; // If current track not found in queue
      const nextIndex = (currentIndex + 1) % queue.length;
      nextTrack = queue[nextIndex];
      setCurrentTrack(nextTrack);
      playTrack(nextTrack.preview_url);
      console.log('next track :', nextTrack.preview_url);

      // togglePlayPause(currentTrack.preview_url, currentTrack.id, currentTrack.name);
    }
  };
  
  const previousTrack = () => {
    if (!currentTrack || queue.length === 0) {
      console.log("No track to play previous.");
      return;
    }
  
    if (isShuffled) {
      const randomTrack = queue[Math.floor(Math.random() * queue.length)];
      setCurrentTrack(randomTrack);
      playTrack(randomTrack.preview_url);
    } else {
      const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
      if (currentIndex === -1) return; // If current track not found in queue
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      const prevTrack = queue[prevIndex];
      setCurrentTrack(prevTrack);
      playTrack(prevTrack.preview_url);

    }

    
  };
  
  const addToQueue = (track) => {
    // Use currentTrack.id as a fallback if track is undefined or missing an id
    const trackId = track?.id || currentTrack?.id;
    const trackToAdd = track || currentTrack;
  
    if (!trackToAdd || !trackId) {
      console.error("No valid track to add to queue:", trackToAdd);
      return; // Exit if there's no valid track to add
    }

    console.log('queue track : ', track);
  
    setQueue((prevQueue) => {
      if (prevQueue.some((t) => t.id === trackId)) {
        console.log("Track already in queue");
        return prevQueue; // Return the existing queue without changes
      } else {
        const updatedQueue = [...prevQueue, trackToAdd];
        console.log("Updated queue:", updatedQueue); // Debug log
        // Auto-play if no current track is set
        if (!currentTrack) setCurrentTrack(trackToAdd);
        return updatedQueue;
      }
    });
  };

  // Automatically go to the next track when the current track ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isLooping, nextTrack]);
  
  // console.log('Current Queue : ', queue);


  return (
    <PlayerContext.Provider value={{ 
      currentTrack, setCurrentTrack,
      isLooping, toggleLooping, toggleShuffle,
      isPlaying, togglePlayPause,
      playTrack, pauseTrack, seek, currentTime,
      duration, setQueue, audioRef, 
      isShuffled, nextTrack, previousTrack, 
      setIsLooping, setIsPlaying, activeTrackId,
      setDuration, nextTrack, previousTrack, addToQueue, queue,
      isLiked, setIsLiked, currentTrackFullDetails, setCurrentTrackFullDetails, addCurrentDetails
// next track, previous track
     }}>
      {children}
    </PlayerContext.Provider>
  );
};
