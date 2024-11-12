import LeftSidebar from "../Components/LeftSidebar";
import Navbar from "../Components/Navbar";
import RightSidebar from "../Components/RightSidebar";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate } from "react-router-dom";
import Controls from "../Components/Controls";
import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { useUser } from "../Context/UserContext";
import { useSearched } from '../Context/SearchedContext';
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, displayName, setDisplayName, setUser, newName, setNewName } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [image, setImage] = useState('');
  const [followedArtists, setFollowedArtists] = useState([]);
  const { isSearched } = useSearched();
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');

  const changeUsername = async (newName) => {
    console.log('new entered name : ', newName)
    // if (!user) {
    //   console.error("User data not available");
    //   return;
    // }
  
    try {
      const response = await axios.put(
        'http://localhost:8000/api/v1/users/update',
        { username: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response);
      console.log("Username updated successfully:", response.data);
      setUser(response.data); // Update user state with the new username
      setDisplayName(newName)
      // toast.success("Username updated successfully!");
    } catch (error) {
      // Check if the error is an AxiosError and log the detailed response
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data || error.message);
        // toast.error("Failed to update username.");
      } else {
        console.error("Unexpected error:", error);
        // toast.error("Unexpected error occurred.");
      }
    }
  };
  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8000/api/v1/users/update',
        { password: currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // toast.success("Password updated successfully!");
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error("Password update failed:", error.response?.data || error.message);
      // toast.error("Failed to update password. Please check the current password.");
    }
  };

  const getFollowedArtists = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/followed-artist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Followed Artists:', response.data.followedArtists);
      setFollowedArtists(response.data.followedArtists); // Update the state with the followed artists
    } catch (err) {
      console.error('Error fetching followed artists:', err);
    }
  };

  const handleModalClick = () => setShowModal(true);

//   const handleImageClick = () => inputRef.current.click();

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("profileImage", file);

  useEffect(() => {
    if (token) {
      getFollowedArtists(); // Fetch followed artists on component mount
    }
  }, [token]);

  console.log('searched : ', isSearched);
  if(isSearched){
    navigate('/');
  }

  return (
    <>
      <div className="flex flex-col h-[90vh]">
        <Navbar />
        <div className="middlePart flex justify-center w-[100%] h-[77vh] pb-20 mt-[90px] overflow-auto">
          <LeftSidebar />
          <div className="w-[57%] h-[123%] flex flex-col text-white shadow-xl shadow-blue-gray-900/5 bg-clip-border rounded-xl" style={{ backgroundColor: "#1B0025" }}>
            {/* Profile Page */}

            <ToastContainer className="fixed top-4 right-4 z-50" position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition="Bounce" />

            <div className="banner flex h-[270px] w-full p-2 bg-clip-border rounded-t-xl" style={{ backgroundColor: "#3e0652" }}>
              {/* Profile Banner */}
              <div className="PicleftSide relative w-[100px] h-[70%] z-1 flex flex-col justify-center self-end bg-neutral-800 transition-all" style={{ borderRadius: "60%", minWidth: "25%" }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => {}}>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="" className="w-[100%] h-[100%] self-center bg-cover rounded-[60%]" />
                ) : (
                  <PersonOutlineOutlinedIcon className="my-8 justify-center self-center" style={{ width: "60%", height: "60%", fill: "grey" }} />
                )}
              </div>

              <div className="rightSide flex w-[75%] h-[65%] self-end gap-3 p-4 flex-col">
                <span className="text-5xl font-bold cursor-text" style={{textDecoration:"none"}}>{displayName}</span>
                {/* <div className="playlists_flw">
                  <span className="cursor-text">2 Playlists</span>
                </div> */}
              </div>
            </div>
              
            {/* <Menu as="div">
                   <MenuButton>
                     <MoreHorizIcon />
                   </MenuButton>
                   <MenuItems className="absolute right-[22%] z-10 w-[190px] origin-top-right rounded-md bg-neutral-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                     {/* <MenuItem className="block p-1 text-neutral-500">
                       <button onClick={handleModalClick}>Edit Profile</button>
                     </MenuItem> */}
                     {/* <MenuItem className="block p-1 text-neutral-500">
                       <Link to="">Change Password</Link>
                     </MenuItem> 
                   </MenuItems>
                 </Menu> */}
                 {/* {showModal && <ChangeName onClose={() => setShowModal(false)} onNameChange={setDisplayName} />} */}
                 

            {/* Followed Artists Section */}
            <div className="Artists h-[50%]">
              <h1 className="text-center p-4">Followed Artists</h1>
              {/* <div>
                <button onClick={getFollowedArtists}>Get Followed Artists</button>
              </div> */}
              <div className="followed-artists-list h-[70%]">
                {console.log('follow : ', followedArtists)}
                
{Array.isArray(followedArtists) && followedArtists.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {followedArtists.map((item) => (
      <div
        key={item.artist?.id}
        className="bg-neutral-900 border-gray-200 shadow dark:bg-[#120018] p-2 rounded-xl dark:border-gray-700 relative w-[12rem] hover:scale-105 transform transition duration-300 ease-in-out"
      >
        {/* Artist Image */}
        {item.artist?.images?.length > 0 && (
          <img
            src={item.artist?.images[0]?.url}
            alt={item.artist?.name}
            className="w-full h-40 object-cover"
          />
        )}

        <div className="p-4">
          {/* Artist Name */}
          <h3 className="text-xl font-semibold text-gray-800">{item.artist?.name}</h3>

          {/* Artist Genres */}
          <p className="text-sm text-gray-500 mt-2">Genres: {item.artist?.genres?.join(', ')}</p>

          {/* Followers Count */}
          <p className="text-sm text-gray-500 mt-2">Followers: {item.artist?.followers?.total}</p>

          {/* Spotify Link */}
          <a
            href={item.artist?.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 mt-4 block"
          >
            View on Spotify
          </a>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-center text-lg text-gray-500 mt-4">No followed artists found.</p>
)}


              </div>
            </div>

          </div>
          <RightSidebar />
        </div>
      </div>

      <Controls />
    </>
  );
}
