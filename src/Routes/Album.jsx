import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { FaPlay } from 'react-icons/fa'; 
import Controls from '../Components/Controls';
import { PlayerContext } from '../Context/PlayerContext';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';


export default function Album() {
  const { albumId } = useParams(); // to get albumId from the URL
  const [album, setAlbum] = useState(null);
  const [AlbTracks, setAlbTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    currentTrack, setCurrentTrack,
      isLooping, toggleLooping, toggleShuffle,
      isPlaying, togglePlayPause,
      play, pause, seek, currentTime,
      duration, setQueue, audioRef, isShuffled,
      nextTrack, previousTrack, addToQueue,
      isLiked, setIsLiked, activeTrackId
  } = useContext(PlayerContext);


  useEffect(() => {
    const fetchAlbumDetails = async () => {
      console.log('Fetching album details for albumId:', albumId);

      try {
       
        const tracksResponse = await fetch(`http://localhost:8000/api/v1/spotify/album/${albumId}/tracks`);
        const tracksData = await tracksResponse.json();
        console.log('Tracks Data:', tracksData); 
        setAlbTracks(tracksData || []); 

        setLoading(false);
      } catch (error) {
        console.error('Error fetching album or tracks:', error);
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  console.log('albtr : ', AlbTracks);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Album Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">{album?.name}</h2>
        {/* <p className="text-xl text-white">By {album?.artists?.map(artist => artist.name).join(', ')}</p> */}
        <p className="text-xl text-gray-400">Tracks</p>
      </div>

      {/* Tracks List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {AlbTracks.map((track) => (
          <div key={track.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
            {/* Track Card */}
            <div className="p-4">
              <div className="flex justify-between items-center">
                {/* <img src={track.image} alt="image"  className='text-black' /> */}
                <span className="text-lg font-semibold text-black">{track.name}</span>
                {/* Play Button */}
                {/* <button className="text-2xl text-gray-500 hover:text-gray-800 transition duration-200">
                  <FaPlay className='text-black' />
                  play
                </button> */}
                <div className="text-black"
                    onClick={() => togglePlayPause(track.preview_url, track.id, track.name, track.artists)} // Pass track URL and ID
                    >

                    {/* {activeTrackId === track.id && isPlaying ? <PauseCircleOutlineIcon className="cursor-pointer mr-5 text-black fill-black outline-black"/> : <PlayCircleOutlinedIcon className="cursor-pointer outline-black text-black fill-black"/> } */}
                    {activeTrackId === track.id && isPlaying ? 
                      <PauseCircleOutlineIcon className="text-neutral-900 bg-neutral-800 hover:text-gray-600 transition-transform duration-200 transform hover:scale-110 rounded-full p-2"
                      fontSize="large" />
                    : <PlayCircleOutlinedIcon className="text-neutral-900 bg-neutral-800 hover:text-gray-600 transition-transform duration-200 transform hover:scale-110 rounded-full p-2"
                    fontSize="large" /> 
                    }
                    </div>
              </div>
              <p className="text-sm text-gray-500">{track.artists?.map(artist => artist.name).join(', ')}</p>
            </div>
            
          </div>
        ))}
      </div>
      <Controls />
    </div>

  );
}
