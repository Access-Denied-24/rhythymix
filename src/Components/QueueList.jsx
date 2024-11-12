import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


export default function QueueList() {
  const { queue, currentTrack } = useContext(PlayerContext);

  if (!Array.isArray(queue)) {
    return <div>No tracks in the queue</div>;
  }

  return (
    // <div className="queue-list ">
    //   <ul>
    //     {queue.map((track) => (
    //       <li key={track.id} className="p-2">
    //         {track.name} - {track.artist}
    //         {track && track.artists && track.artists.length > 0
    //           ? track.artists.map(artist => artist.name).join(', ') // to join the artist names
    //           : 'No artists available'}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="queue-list bg-gradient-to-r from-purple-900 to-indigo-800 rounded-xl shadow-lg p-4">
  <h2 className="text-white text-xl font-semibold mb-4 text-center">Queue</h2>
  <ul className="space-y-2">
    {queue.map((track) => (
      <li
        key={track.id}
        className="flex justify-between items-center p-3 rounded-lg bg-purple-700 hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="text-white flex flex-col space-y-1">
          <span className="text-sm font-medium">{track.name}</span>
          <span className="text-xs text-gray-300">{track && track.artists && track.artists.length > 0
            ? track.artists.map(artist => artist.name).join(', ') // to join the artist names
            : 'No artists available'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-gray-800 fill-white text-black rounded-full hover:bg-gray-600 transition duration-200">
            <span className="material-icon text-white fill-white outline-whites">
              <PlayCircleIcon className="w-[20px]" />
            </span>
          </button>
              <RemoveCircleOutlineIcon className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition duration-200 cursor-pointer" style={{width:"40px", height:"40px"}} />
         
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}
