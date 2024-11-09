import Navbar from "../Components/Navbar";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import Preloader from "../Components/Preloader";
import { useState, useEffect } from "react";
import Controls from "../Components/Controls";
import ToastNotif from "../Components/SuccessMsg";
import TracksPage from "../Components/TracksPage";

export default function Home() {
  const [ tracks, setTracks ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ albums, setAlbums ] = useState([]);

  useEffect(() => {
    const fetchNewReleases= async() => {
      try{
        let data = await fetch(`https://v1.nocodeapi.com/bot1234/spotify/woAekyFttqVGFynL/browse/new?country=India&perPage=5`);
        
        let convertedData = await data.json();
        console.log(convertedData);
        setAlbums(convertedData.albums.items);
        setIsLoading(false);
      } 
      catch(error){
        console.log('Error fetching new releases: ', error);
        setIsLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  if(isLoading) return <Preloader />

  return (
    <>
    <div className="flex flex-col h-[90vh]">
      <Navbar setTracks={setTracks} />
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="flex justify-center items-start flex-grow w-[100%] h-[100%]">
          <div className="middleCont w-[57%] h-[100%] flex flex-col justify-center rounded-xl bg-neutral-800 text-white p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto" style={{backgroundColor:"#1B0025"}}>
            {/* <b>Home Page</b> */}
  
            <div className="homeContent w-full h-max-[500px] text-center overflow-auto">

              <div className="recommended ">
                <h2>Top 5 Recommended Albums</h2>
  
                <div className="albumsGrid flex flex-wrap gap-4 justify-center">
                    {albums.map((album) => (
                      <div key={album.id} className="card border rounded-md flex flex-col w-[25%]">
                        <div className="ImgCont">
                          <img src={album.images[0].url} alt={album.name} className="rounded-md" />
                        </div>
                        <div className="infoCont p-2">
                          <p><strong>{album.name}</strong></p>
                          <p>{album.artists.map(artist => artist.name).join(', ')}</p>
                          <p>Total Tracks : {album.total_tracks}</p>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>

              {/* <div className="recentlyPlayed">
                Recently Played Albums
              </div>

              <div className="bestOfArtists">
                Best of Artists
              </div> */}
            </div>
            <TracksPage tracks={tracks} />
           </div>
        </div>
        <RightSidebar />
      </div>
    </div>

    <ToastNotif />
    <Controls />


    </>
  );
}