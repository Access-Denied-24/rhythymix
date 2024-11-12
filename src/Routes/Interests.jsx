// import { useState } from "react"
// import { Link } from "react-router-dom";
// import { useSpring, animated } from "react-spring";

// export default function Interests() {
//   const [ clicked, setClicked ] = useState(false);

//   const fadeIn = useSpring({
//     opacity: 1,
//     from: {opacity: 0},
//     config: {duration: 1000},
//   });

//   const handleClick = () => {
//     setClicked(!clicked);
//   }

//   return (
//     <>
//       <animated.div className="Cont p-2 flex flex-col items-center my-28" style={fadeIn}>
//         <h1 className="my-2">Select 3 Interests</h1>

//         <div className="AllOpts m-2 flex items-center w-[50vw] flex-col gap-5">
//           <div className="row w-full flex justify-between">

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
//             ${clicked ? "bg-green-600" : "bg-inherit"}
//             `} 
//             onClick={handleClick}>Pop</span>

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
//             `} 
//             onClick={handleClick}>Jazz</span>

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>Rock</span>
            
//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>Metal</span>

//           </div>

//           <div className="row w-full flex justify-between">

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>Rap</span>

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
//             `} 
//             onClick={handleClick}>Electronic</span>

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>Indie</span>
            
//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>Classical</span>

//           </div>

//           <div className="row w-full flex justify-between">

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>R&B</span>

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
//             `} 
//             onClick={handleClick}>Reggae</span>

//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>Country</span>
            
//             <span className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline
            
//             `} 
//             onClick={handleClick}>Latin</span>

//           </div>


        
        
        
//         </div>
//         <Link to="/" type="submit" className="bg-white text-black p-2 border rounded-3xl w-[120px] text-center mt-10">Continue</Link>

//       </animated.div>

//     </>
//   )
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import axios from 'axios';

export default function Interests() {
  const [clicked, setClicked] = useState([]);
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  // Fade in animation
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handleClick = (interest) => {
    setClicked(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest); // Remove if already selected
      } else {
        return [...prev, interest]; // Add to the list of selected interests
      }
    });
  };

  const handleSubmit = async () => {
    // Send the selected interests to the backend
    try {
      const token = localStorage.getItem('userToken'); // Get the token from local storage

      if (!token) {
        alert('You need to be logged in to save interests');
        return;
      }

      const response = await axios.put(
        'http://localhost:8000/api/v1/users/select-interests',
        { interests: clicked }, // Send the selected interests to the backend
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in authorization header
          }
        }
      );

      alert(response.data.message); // Show success message from the backend
      navigate('/login'); // Redirect to home or dashboard page after successful submission
    } catch (error) {
      console.error('Error selecting interests:', error);
      alert('Failed to save interests');
    }
  };

  return (
    <animated.div className="Cont p-2 flex flex-col items-center my-28" style={fadeIn}>
      <h1 className="my-2">Select 3 Interests</h1>

      <div className="AllOpts m-2 flex items-center w-[50vw] flex-col gap-5">
        <div className="row w-full flex justify-between">
          {["Pop", "Jazz", "Rock", "Metal"].map(interest => (
            <span
              key={interest}
              className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline ${clicked.includes(interest) ? "bg-green-600" : "bg-inherit"}`}
              onClick={() => handleClick(interest)}
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="row w-full flex justify-between">
          {["Rap", "Electronic", "Indie", "Classical"].map(interest => (
            <span
              key={interest}
              className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline ${clicked.includes(interest) ? "bg-green-600" : "bg-inherit"}`}
              onClick={() => handleClick(interest)}
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="row w-full flex justify-between">
          {["R&B", "Reggae", "Country", "Latin"].map(interest => (
            <span
              key={interest}
              className={`border rounded-3xl px-4 py-0.5 text-lg hover:bg-green-400 hover:no-underline ${clicked.includes(interest) ? "bg-green-600" : "bg-inherit"}`}
              onClick={() => handleClick(interest)}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="bg-white text-black p-2 border rounded-3xl w-[120px] text-center mt-10">
        Continue
      </button>
    </animated.div>
  );
}
