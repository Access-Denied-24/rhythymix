import { useState } from "react"
import { Link } from "react-router-dom";

export default function Interests() {
  const [ clicked, setClicked ] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }
  return (
    <>
      <div className="Cont p-2 flex flex-col items-center my-40">
        <h1 className="my-2">Select 3 Interests</h1>

        <div className="AllOpts m-2 flex items-center w-[50vw] flex-col gap-5">
          <div className="row w-full flex justify-between">

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            ${clicked ? "bg-green-600" : "bg-inherit"}
            `} 
            onClick={handleClick}>Pop</span>

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            `} 
            onClick={handleClick}>Jazz</span>

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Rock</span>
            
            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Metal</span>

          </div>

          <div className="row w-full flex justify-between">

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Pop</span>

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            `} 
            onClick={handleClick}>Jazz</span>

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Rock</span>
            
            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Metal</span>

          </div>

          <div className="row w-full flex justify-between">

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Pop</span>

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            `} 
            onClick={handleClick}>Jazz</span>

            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Rock</span>
            
            <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
            `} 
            onClick={handleClick}>Metal</span>

          </div>


        
        
        
        </div>
        <Link to="/" type="submit" className="bg-white text-black p-2 border rounded-3xl w-[120px] text-center mt-10">Continue</Link>

      </div>

    </>
  )
}