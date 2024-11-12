import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useEffect } from 'react';
import { PlayerContext } from '../Context/PlayerContext';
import QueueList from './QueueList';

export default function RightSidebar() {
  const { currentTrack, currentTrackFullDetails, setCurrentTrackFullDetails, addCurrentDetails } = useContext(PlayerContext);

  console.log('new ::: ',currentTrackFullDetails)

  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrackFullDetails(null);
    }
    // console.log("Updated track details in RightSidebar:", currentTrackFullDetails);
  }, [currentTrackFullDetails]);


  return (
    <>
      <div className="absolute hidden right-0 bottom-[10%] top-[89px] lg:flex flex-col  rounded-xl text-white w-60 p-4 shadow-2xl transition-transform transform overflow-auto" style={{backgroundColor:"#1B0025"}}>
        <div className="mb-2 p-2">
          <h5 className="text-xl font-semibold tracking-wide text-center">Active Song</h5>
        </div>
        
        <nav className="flex flex-col gap-4 p-2">
          
          {console.log(currentTrackFullDetails)}
          {
            currentTrackFullDetails ? (

            <div className="flex flex-col gap-2 p-3 bg-purple-900 rounded-lg">
              <img src={currentTrackFullDetails.trackimg} alt="Track" className="rounded-lg" />
              <div>
                <span className="font-bold text-lg" style={{textDecoration:"none"}}>Name: </span>
                <span className="font-bold text-[18px]">{currentTrackFullDetails.name}</span>
              </div>
              <div>
                <span className="font-bold text-lg" style={{textDecoration:"none"}}>Artists: </span>
                <span className="font-bold text-[18px]">{currentTrack && currentTrack.artists && currentTrack.artists.length > 0
                  ? currentTrack.artists.map(artist => artist.name).join(', ')
                  : 'No artists available'}</span>
              </div>
              <div>
                <span className="font-bold text-lg" style={{textDecoration:"none"}}>Popularity: </span>
                <span className="font-bold text-[18px]">{currentTrackFullDetails.pop} / 100</span>
              </div>
              <div>
                <span className="font-bold text-[20px]" style={{textDecoration:"none"}}>Release Date: </span>
                <span >{currentTrackFullDetails.releaseDate}</span>
              </div>
              <div>
                <span className="font-bold text-lg" style={{textDecoration:"none"}}>Album: </span>
                <span className="font-bold text-[18px]">{currentTrackFullDetails.albumName}</span>
              </div>
              <div>
                <span className="font-bold text-lg" style={{textDecoration:"none"}}>Total Tracks: </span>
                <span className="font-bold text-[18px]">{currentTrackFullDetails.totaltracks}</span>
              </div>
            </div>
            ) : (
             null
            )
          }

         
      
            <QueueList />
        </nav>
      </div>
    </>
  );
}
