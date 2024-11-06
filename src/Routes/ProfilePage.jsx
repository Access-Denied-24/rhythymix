import LeftSidebar from "../Components/LeftSidebar";
import Navbar from "../Components/Navbar";
import RightSidebar from "../Components/RightSidebar";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate } from "react-router-dom";
import Controls from "../Components/Controls";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChangeName from "../Components/ChangeName";
import Settings from "./Settings";
import Home from "./Home";
import { Navigate } from "react-router-dom";

export default function ProfilePage({newName}){

  const [user, setUser] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ displayName, setDisplayName ] = useState('vortex' || '');

  const navigate = useNavigate();

  const handleModalClick = () => {
    setShowModal(true);
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
        setDisplayName(data.username);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;
  
  // if(!user) return navigate('/');

  // let displayName = user.username;

  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="middlePart flex justify-center items-start w-[100%] h-[100%]">
          <div className=" w-[57%] h-[100%] min-w-[57%] mim-h-[100%] flex flex-col  bg-neutral-800 text-white shadow-xl shadow-blue-gray-900/5
          bg-clip-border rounded-xl
          ">
            {/* Profile Page */}
            <div className="banner flex h-[50%] w-full bg-neutral-700 p-2 bg-clip-border rounded-t-xl">
              
              <div className="PicleftSide border w-[15vw] h-[30vh] flex justify-center  self-end bg-neutral-800" style={{borderRadius:"60%", minWidth:"25%"}}>
                <PersonOutlineOutlinedIcon className="my-8 justify-center" style={{width:"60%", height:"60%",fill:"grey"}} />
              </div>
              <div className="rightSide flex w-[75%] h-[65%] self-end gap-3 p-4 flex-col">
                <span className="no-underline cursor-default" style={{textDecoration:"none"}}>{user.email}</span>
                {/* <span className="text-5xl font-bold" style={{textDecoration:"none"}}>{user.username}</span> */}
                <span className="text-5xl font-bold" style={{textDecoration:"none"}}>{displayName}</span>
                <div className="playlists_flw">
                  <span className="cursor-text" style={{textDecoration:"none"}}>2 Playlists • </span>
                  <span>3 Followers</span>
                </div>
              </div>

              <button></button>
              <Menu as="div" >
                <div>
                  <MenuButton>
                    <MoreHorizIcon />
                  </MenuButton>
                </div>
                <MenuItems transition className="
                absolute right-[22%] z-10  w-[190px] origin-top-right rounded-md bg-neutral-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <MenuItem className="block p-1 text-neutral-500 data-[focus]:bg-neutral-700">
                    {/* <Link to="">Edit profile</Link> */}
                    <button onClick={handleModalClick}>Edit Profile</button>
                  </MenuItem>
                    {showModal && (<ChangeName onClose={() => setShowModal(false)}
                    onNameChange={setDisplayName}
                    />)}

                  <MenuItem className="block p-1 text-neutral-500 data-[focus]:bg-neutral-700">
                    <Link to="">Change Password</Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
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