import Navbar from "../Components/Navbar";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import Preloader from "../Components/Preloader";
import { useState, useEffect } from "react";
import Controls from "../Components/Controls";
export default function Home() {
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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="flex justify-center items-start flex-grow w-[100%] h-[100%]">
          <div className="w-[57%] h-[100%] flex justify-center rounded-xl bg-neutral-800 text-white p-4 shadow-xl shadow-blue-gray-900/5">
            Home Page
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>

    <Controls />

    </>
  );
}