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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if(isLoading) return <Preloader />

  return (
    <>
    <div className="flex flex-col h-[90vh]">
      <Navbar setTracks={setTracks} />
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="flex justify-center items-start flex-grow w-[100%] h-[100%]">
          <div className="middleCont w-[57%] h-[100%] flex flex-col justify-center rounded-xl bg-neutral-800 text-white p-4 shadow-xl shadow-blue-gray-900/5 border-2" style={{backgroundColor:"#1B0025"}}>
            {/* <b>Home Page</b> */}
  
            <div className="homeContent border w-full h-full text-center">
              Home Content

              <div className="recommended border">
                5 Recommended Albums
              </div>

              <div className="recentlyPlayed">
                Recently Played Albums
              </div>

              <div className="bestOfArtists">
                Best of Artists
              </div>
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