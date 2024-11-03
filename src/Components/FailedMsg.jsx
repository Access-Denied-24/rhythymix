import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function FailedMsg(){
  const [ visibility, setVisibility ] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div role="alert" className={`MContainer border w-[300px] h-[65px] flex justify-between p-1 self-center items-center rounded-md
    absolute top-14 right-0 z-1 bg-zinc-100 transition-opacity duration-300 
    ${visibility ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="Message flex  w-[80%] justify-evenly self-center items-center">
        <PriorityHighIcon className="border rounded-sm" style={{fill:"green", backgroundColor:"lightgreen"}} />
        <span className="text-[16px] text-black">Logged in successfully.</span>
      </div>
      
      <CloseIcon style={{fill:"grey"}} onClick={() => setVisibility(false)} />
    </div>
  )
}