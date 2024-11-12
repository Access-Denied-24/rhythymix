import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import axios from 'axios';

export default function Interests() {
  const [clicked, setClicked] = useState([]);
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const handleClick = (interest) => {
    setClicked(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest); 
      } else {
        return [...prev, interest]; 
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('userToken'); 
      if (!token) {
        alert('You need to be logged in to save interests');
        return;
      }

      const response = await axios.put(
        'http://localhost:8000/api/v1/users/select-interests',
        { interests: clicked }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        }
      );

      alert(response.data.message); 
      navigate('/login'); 
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
