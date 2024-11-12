import LeftSidebar from "../Components/LeftSidebar";
import Navbar from "../Components/Navbar";
import RightSidebar from "../Components/RightSidebar";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate } from "react-router-dom";
import Controls from "../Components/Controls";
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useUser } from "../Context/UserContext";
import { useSearched } from '../Context/SearchedContext';
import { ToastContainer, toast } from "react-toastify";
import Modal from "../Components/Modal";
import PasswordModal from "../Components/PasswordModal";


export default function ProfilePage(){

  // const [user, setUser] = useState(null);
  const {user, displayName, setDisplayName, setUser, newName, setNewName} = useUser();

  // let [ displayName, setDisplayName ] = useState('vortex' || '');
  const [ showModal, setShowModal ] = useState(false);
  const [ isHovering, setIsHovering ] = useState(false);
  const [ image, setImage ] = useState('');
  const inputRef = useRef(null);
  const { isSearched, tracks, setTracks } = useSearched();
  // const [ newName, setNewName ] = useState('');

  const navigate = useNavigate();
  // console.log(displayName);

  const token = localStorage.getItem('token');
  const [modalOpen, setModalOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const handleModalClick = () => {
    setShowModal(true);
    // console.log(displayName);
  }

  const handleImageClick = () => {
    inputRef.current.click();
  };


    const handleImageChange = async(event) => {
      const file = event.target.files[0];
      // setImage(file);

      const formData = new FormData();
      formData.append("profileImage", file);

  
        axios
        .post("http://localhost:8000/api/v1/users/profileImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Optional if axios is used with FormData
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          // Update the image URL state after successful upload
          setImage(response.data.imageUrl); // Assuming backend sends the URL in `imageUrl`
        })
        .catch((error) => {
          console.error("Error uploading image:", error.response || error.message); // Log the error
          alert("Failed to upload image. Please try again.");
        });
      };


    if(isSearched){
      navigate('/');
    }


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
    
    
    
    // if(!user) return navigate('/');

    // let displayName = user.username;

    const showToast = () => {
      toast.success('🦄 Notification!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
        className: 'bg-gray-800 text-white font-semibold p-4 rounded-lg shadow-lg', 
        bodyClassName: "text-sm",
        progressClassName: 'bg-blue-500',
      });
    };

    
  
  return (
    <>
    <div className="flex flex-col h-[90vh]">
      <Navbar />
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="middlePart flex justify-center  w-[100%] h-[77vh] pb-20 mt-[90px]">
          <div className="w-[57%] h-[123%] flex flex-col text-white shadow-xl shadow-blue-gray-900/5
          bg-clip-border rounded-xl
          " style={{backgroundColor:"#1B0025"}}>
            {/* Profile Page */}

            <ToastContainer
              className="fixed top-4 right-4 z-50"
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition="Bounce" />

            
            {/* {isSearched ? (
              <TracksPage tracks={tracks || []} />
            ) : ( */}
              <div className="banner flex h-[270px] w-full p-2 bg-clip-border rounded-t-xl" style={{backgroundColor:"#3e0652"}}>

                {/* w-[15vw] h-[30vh] */}
                <div className="PicleftSide relative w-[100px] h-[70%] z-1 flex flex-col justify-center self-end bg-neutral-800 transition-all" style={{borderRadius:"60%", minWidth:"25%"}}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleImageClick}
                >
                  {image ? 
                    <img src={URL.createObjectURL(image)} alt="" className="w-[100%] h-[100%] self-center bg-cover rounded-[60%]" />
                    :
                    <PersonOutlineOutlinedIcon className={`my-8 justify-center self-center
                    `} style={{width:"60%", height:"60%",fill:"grey"}} />
                    
                  }
                  <div className="absolute flex flex-col items-center w-full h-full justify-end gap-2 p-4 border transition-all duration-300 ease-in-out opacity-100 cursor-pointer" style={{borderRadius:"60%", backgroundColor:"rgba(0,0,0,0.2)",
                    opacity: isHovering ? 1 : 0,
                    visibility: isHovering ? 'visible' : 'hidden',
                    transform: isHovering ? 'scale(1)' : 'scale(0.95)'
                    }}>
                  {isHovering &&
                    <>
                    <EditIcon className={`transition-all duration-300 ease-in-out ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{width:"50%", height:"60%", fill:"white"}}  />
                    <span className="cursor-default" style={{textDecoration:"none"}}>Upload Photo</span>
                    </>
                    
                  } 
                  </div>
                  
                  <input type="file" ref={inputRef} onChange={handleImageChange} className="hidden" />

                </div>
                <div className="rightSide flex w-[75%] h-[65%] self-end gap-3 p-4 flex-col">
                  {/* <span className="no-underline text-white cursor-default" style={{textDecoration:"none"}}>{user.email}</span> */}
                  {/* <span className="text-5xl font-bold" style={{textDecoration:"none"}}>{user.username}</span> */}
                  <span className="text-5xl font-bold" style={{textDecoration:"none"}}>{displayName}</span>
                  {/* {console.log('displayname : ',displayName)} */}
                  <div className="playlists_flw">
                    <span className="cursor-text" style={{textDecoration:"none"}}>2 Playlists</span>
                    {/* <span>3 Followers</span> */}
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
                    <MenuItem className="block p-1 text-neutral-500 data-[focus]:bg-neutral-700 ">
                      {/* <Link to="">Edit profile</Link> */}
                      <button onClick={handleOpenModal}>Edit Profile</button>
                    </MenuItem>
    
                    <MenuItem className="block p-1 text-neutral-500 data-[focus]:bg-neutral-700 w-full">
                      <>
                      {/* <Link to="" >Change Password</Link> */}
                      <button onClick={() => setShowPasswordModal(true)}className="text-neutral-500 data-[focus]:bg-neutral-700" >Change Password</button>
                        {showPasswordModal && (
                          <PasswordModal
                          currentPassword={currentPassword}
                          newPassword={newPassword}
                          setCurrentPassword={setCurrentPassword}
                          setNewPassword={setNewPassword}
                          onSave={handleChangePassword}
                          onClose={() => setShowPasswordModal(false)}
                          />
                          )}
                        </>
                    </MenuItem>
                  </MenuItems>
                </Menu>
                {/* 
                {showModal && (<ChangeName onClose={() => setShowModal(false)}  onNameChange={changeUsername} />)} */}
                     
                {modalOpen && <Modal onClose={handleCloseModal} changeUsername={changeUsername} />}

                

              </div>

            {/* ) */}
            {/* } */}

          </div>
        </div>
        <RightSidebar />
      </div>
    </div>

    <Controls />

    </>
  );
}


