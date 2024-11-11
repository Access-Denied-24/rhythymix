import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Album() {
  const { albumId } = useParams(); // Get albumId from the URL
  const [album, setAlbum] = useState(null);
  const [AlbTracks, setAlbTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      console.log('Fetching album details for albumId:', albumId);

      try {
        // Fetch album details by albumId
        const albumResponse = await fetch(`http://localhost:8000/api/v1/spotify/album/${albumId}`);
        const albumData = await albumResponse.json();
        console.log('Album Data:', albumData); // Log album data
        setAlbum(albumData);

        // Fetch tracks for the album by albumId
        const tracksResponse = await fetch(`http://localhost:8000/api/v1/spotify/album/${albumId}/tracks`);
        const tracksData = await tracksResponse.json();
        console.log('Tracks Data:', tracksData); // Log tracks data
        setAlbTracks(tracksData || []); // Set the tracks data

        setLoading(false);
      } catch (error) {
        console.error('Error fetching album or tracks:', error);
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  console.log('albtr : ', AlbTracks);

  // console.log('album length :', AlbTracks.tracks.length);
  // const albumTrs = tracks;

  if (loading) return <div>Loading...</div>;

  // if (!album) return <div>Album not found</div>;

  return (
    <div>
      {/* <h2>{album.name}</h2> */}
      {/* <p>By {tracks.artists.map(artist => artist.name).join(', ')}</p> */}
      <ul>

          {
          AlbTracks.map(track => (
            <li key={track.id}>{track.name}</li>
          ))    
          }
      </ul>
    </div>
  );
}
