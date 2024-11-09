// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Search } from "@mui/icons-material";
// import { HomeIcon } from '@heroicons/react/24/outline';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import TracksPage from './TracksPage';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


// export default function Navbar({ setTracks }) {
//   const [isClicked, setIsClicked ] = useState(false);
  
//   const [ InputValue, setInputValue ] = useState('');
//   const [ isSearched, setIsSearched ] = useState(false);

//   const inputVal = (event) => {
//     setInputValue(event.target.value);
//   }
//   const handleClick = () => {
//     setIsClicked(!isClicked);
//     setIsSearched(true);
//   }

//     const getTracks = async() => {
//       // let data = await fetch(`https://v1.nocodeapi.com/bot1234/spotify/woAekyFttqVGFynL/search?q=${InputValue}&type=track`);

//       let data = await fetch(`https://v1.nocodeapi.com/bot123/spotify/UlzMyEBprtImaFNJ/search?q=${InputValue}&type=track`);
      
//       // https://v1.nocodeapi.com/bot1234/spotify/woAekyFttqVGFynL/search?q=starboy&type=track
//       let convertedData = await data.json();

//       console.log(convertedData.tracks.items);
//       console.log(convertedData.tracks);

//       setTracks(convertedData.tracks.items);
//     }    

//     const isAuthenticated = localStorage.getItem('token');

//     let [ isFocused, setIsFocused ] = useState(false); 
//     const navigate = useNavigate();
//       const handleLogout = () => {
      
//         localStorage.removeItem('token');
//         alert('You have logged out successfully');
//         navigate('/'); // Redirect to login page
//       };
    
     

//   return (
//     <Disclosure as="nav" className="my-2" style={{backgroundColor:"#1B0025"}}>
//       <div className="px-4">
//         <div className="relative flex p-2 h-14 items-center justify-between">

//           <div className="flex items-center justify-between">
//             <div className="flex flex-shrink-0 items-center">
//               <Link to="/">
//                 <img
//                   alt=""
//                   src="../public/websiteLogo1.jpg"
//                   className="h-10 w-auto bg-transparent cursor-pointer"
//                 />
//               </Link>
//             </div>
//           </div>
//           <div className="middleSection flex w-[50%] h-[100%] justify-between">
          
//           <Link to="/">
//             <HomeIcon className={`w-[50px] h-[40px] mx-4 cursor-pointer rounded-3xl p-1
//             ${isClicked ? 'fill-white text-white' : 'text-gray-500'}
//             hover:bg-neutral-800 active:outline-white focus: text-white
//             `} 
//             onClick={handleClick}
//             />
//           </Link>

//           <div className="searchbar flex w-[80%] items-center">
//             <input type="text" onChange={inputVal} placeholder="What do you want to play?" className="w-[100%] h-[100%] rounded-l-[25px] bg-neutral-800 pl-3 text-start text-white border-none focus: outline-none" 
//             // onFocus={() => setIsFocused(true)} 
//             // onBlur={() => setIsFocused(false)}
//             />

//           {isFocused ? 
//             <div className='suggestions absolute bottom-[-30px] flex w-[32.2%]  text-white rounded-b-md  ml-2 px-2 py-1' style={{backgroundColor:"rgba(255,255,255,0.1)"}}>
//                 {/* <p>
//                   {inputVal}
//                 </p> */}
//                 Results appear here
//             </div>
//           : <div className='absolute bottom-[-15px] flex w-[30%]  text-white rounded-b-md bg-neutral-800 ml-2 px-2 py-1 hidden'>
//             not focused
//           </div> }

//             <button type='button' className="w-[20%] h-[100%] rounded-r-3xl" onClick={getTracks}>
//               <Search className="text-white bg-neutral-800 rounded-r-[25px] p-2 cursor-pointer" style={{width: "100%", height: "100%", borderLeftColor:"white", borderLeft:"", borderColor:"#ffffff"}}/>
//             </button>
//           </div>
//         </div>
//           <div className="w-[10%] absolute inset-y-0 right-0 flex justify-between items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <button
//               type="button"
//               className="relative rounded-full bg-neutral-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//             >
//               <span className="absolute -inset-1.5" />
//               <span className="sr-only">View notifications</span>
//               <BellIcon aria-hidden="true" className="h-6 w-6" />
//             </button>

//             {/* Profile dropdown */}
//             {isAuthenticated ? (
//               <div className=''>
//                 {/* <AccountCircleOutlinedIcon className="h-10 w-8 rounded-full" style={{width: "35px", height: "35px"}} />  */}

//             <Menu as="div" className="relative ml-3">
//               <div>
//                 <MenuButton className="relative rounded-md flex bg-transparent text-sm focus:outline-none ">
//                   <span className="w-[35px] h-[35px]">
//                     <AccountCircleOutlinedIcon className="h-10 w-8 rounded-full" style={{width: "35px", height: "35px"}} /> 
//                   </span>
//                   <span className="sr-only">Open user menu</span>
//                   {/* <img
//                     alt=""
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                      className="h-8 w-8 rounded-full"
//                    /> */}
                   
//                 </MenuButton>
//               </div>
//               <MenuItems
//                 transition
//                 className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//               >
//                 <MenuItem>
//                    <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-500 data-[focus]:bg-neutral-700">
//                     Your Profile
//                    </Link>
//                 </MenuItem>
//                 <MenuItem>
//                   <a href="/settings" className="block px-4 py-2 text-sm text-neutral-500 data-[focus]:bg-neutral-700">
//                     Settings
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-neutral-500 data-[focus]:bg-neutral-700">
//                     Logout
//                   </a>
//                 </MenuItem>
//               </MenuItems>
//             </Menu>

//             </div>) : (
//               <div className=' font-medium rounded-md flex justify-center  w-[70px] h-[40px] hover:bg-purple-900 transition-all'>
//                 <Link to="/login" className='w-full h-full text-center self-center content-center' >Login</Link> 
//               </div> )}

//           </div>
//         </div>
//       </div>

//       <DisclosurePanel className="sm:hidden">
//         <div className="space-y-1 px-2 pb-3 pt-2">
//           {/* {navigation.map((item) => (
//             <DisclosureButton
//               key={item.name}
//               as="a"
//               href={item.href}
//               aria-current={item.current ? 'page' : undefined}
//               className={classNames(
//                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                 'block rounded-md px-3 py-2 text-base font-medium',
//               )}
//             >
//               {item.name}
//             </DisclosureButton>
//           ))} */}
//         </div>
//       </DisclosurePanel>
//     </Disclosure>
//   )
// }

// {/* Mobile menu button*/}
//             {/* <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//               <span className="absolute -inset-0.5" />
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
//               <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
//             </DisclosureButton> */}






import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Search } from "@mui/icons-material";
import { HomeIcon } from '@heroicons/react/24/outline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ setTracks }) {
  const [isClicked, setIsClicked] = useState(false);
  const [InputValue, setInputValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const inputVal = (event) => {
    setInputValue(event.target.value);
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsSearched(true);
  }

  const getTracks = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/spotify/multi-search?query=${InputValue}`);
      const data = await response.json();
      
      // Pass all categories (songs, albums, playlists, artists) to the setTracks function
      setTracks({
        songs: data.songs,
        albums: data.albums,
        playlists: data.playlists,
        artists: data.artists,
      });
    } catch (error) {
      console.error('Error fetching multi-search data:', error);
    }
  }

  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have logged out successfully');
    navigate('/'); // Redirect to login page
  };

  return (
    <Disclosure as="nav" className="my-2" style={{ backgroundColor: "#1B0025" }}>
      <div className="px-4">
        <div className="relative flex p-2 h-14 items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  alt=""
                  src="../public/websiteLogo1.jpg"
                  className="h-10 w-auto bg-transparent cursor-pointer"
                />
              </Link>
            </div>
          </div>
          <div className="middleSection flex w-[50%] h-[100%] justify-between">
            <Link to="/">
              <HomeIcon className={`w-[50px] h-[40px] mx-4 cursor-pointer rounded-3xl p-1
              ${isClicked ? 'fill-white text-white' : 'text-gray-500'}
              hover:bg-neutral-800 active:outline-white focus: text-white
              `}
                onClick={handleClick}
              />
            </Link>

            <div className="searchbar flex w-[80%] items-center">
              <input type="text" onChange={inputVal} placeholder="What do you want to play?" className="w-[100%] h-[100%] rounded-l-[25px] bg-neutral-800 pl-3 text-start text-white border-none focus: outline-none" />
              <button type='button' className="w-[20%] h-[100%] rounded-r-3xl" onClick={getTracks}>
                <Search className="text-white bg-neutral-800 rounded-r-[25px] p-2 cursor-pointer" style={{ width: "100%", height: "100%", borderLeftColor: "white" }} />
              </button>
            </div>
          </div>
          <div className="w-[10%] absolute inset-y-0 right-0 flex justify-between items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-neutral-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            {isAuthenticated ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative rounded-md flex bg-transparent text-sm focus:outline-none ">
                    <span className="w-[35px] h-[35px]">
                      <AccountCircleOutlinedIcon className="h-10 w-8 rounded-full" style={{ width: "35px", height: "35px" }} />
                    </span>
                    <span className="sr-only">Open user menu</span>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-neutral-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                >
                  <MenuItem>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-500">
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a href="/settings" className="block px-4 py-2 text-sm text-neutral-500">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-neutral-500">
                      Logout
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className='font-medium rounded-md flex justify-center w-[70px] h-[40px] hover:bg-purple-900 transition-all'>
                <Link to="/login" className='w-full h-full text-center self-center content-center'>Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
