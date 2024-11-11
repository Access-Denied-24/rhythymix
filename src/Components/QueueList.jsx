import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";

export default function QueueList() {
  const { queue } = useContext(PlayerContext);

  if (!Array.isArray(queue)) {
    return <div>No tracks in the queue</div>;
  }

  return (
    <div className="queue-list">
      <h2>Queue</h2>
      <ul>
        {queue.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}
