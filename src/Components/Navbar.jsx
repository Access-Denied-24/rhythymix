import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Search } from "@mui/icons-material";
import { HomeIcon } from '@heroicons/react/24/outline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearched } from '../Context/SearchedContext';
import { useUser } from '../Context/UserContext';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  const [InputValue, setInputValue] = useState('');
  const { setIsSearched, tracks, setTracks } = useSearched();
  const { user } = useUser();


  const inputVal = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') getTracks();
  }

  // Prevent multiple API calls on state change by using useEffect
  useEffect(() => {
    // Debounce search function (e.g., after typing stops for 1 second)
    const timeoutId = setTimeout(() => {
      if (InputValue.trim() !== "") {
        getTracks();
      }
    }, 1000);

    return () => clearTimeout(timeoutId); // Cleanup the previous timeout
  }, [InputValue]);

  const getTracks = async () => {
    if (InputValue.trim() === "") return;  // Prevent search if input is empty

    try {
      const response = await fetch(`http://localhost:8000/api/v1/spotify/multi-search?query=${InputValue}`);
      const data = await response.json();

      setTracks({
        songs: data.songs || [],
        albums: data.albums || [],
        playlists: data.playlists || [],
        artists: data.artists || [],
      });

      setIsSearched(true);
      // navigate(`/profile?search=${InputValue}`);
    } catch (error) {
      console.error('Error fetching multi-search data:', error);
    }
  };

  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have logged out successfully');
    navigate('/'); // Redirect to login page
  };

  // const handlePlayPause = () => {
  //   if (audioRef.current.paused) {
  //     audioRef.current.play();
  //     setIsPlaying(true);  // Only set playing state to true when play is pressed
  //   } else {
  //     audioRef.current.pause();
  //     setIsPlaying(false); // Set playing state to false when paused
  //   }
  // };

  return (
    <Disclosure as="nav" className="bg-[#120018] py-2 fixed w-[100vw] z-10" >
      <div className="" style={{ backgroundColor: "#1B0025" }}>
      <div className="px-4">
        <div className="relative flex p-2 h-14 items-center justify-between">
          <div className="hidden lg:flex items-center justify-between">
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
          <div className="middleSection -translate-x-5 lg:translate-x-0 flex w-[76%] lg:w-[50%] h-[100%] justify-between">
            <Link to="/">
              <HomeIcon className={`w-[50px] h-[40px] lg:mx-4 cursor-pointer rounded-3xl p-1
              ${isClicked ? 'fill-white text-white' : 'text-gray-500'}
              hover:bg-neutral-800 active:outline-white focus: text-white
              `}
                onClick={handleClick}
              />
            </Link>

            <div className="searchbar flex w-[80%] items-center">
              <input
                type="text"
                onChange={inputVal}
                value={InputValue}
                placeholder="What do you want to play?"
                className="w-[100%] h-[100%] rounded-l-[25px] bg-neutral-800 pl-3 text-start text-white border-none focus: outline-none"
              />
              <button
                type='button'
                className="w-[40%] lg:w-[20%] h-[100%] rounded-r-3xl"
                onClick={getTracks} onKeyDown={handleKeyDown}
              >
                <Search
                  className="text-white bg-neutral-800 rounded-r-[25px] p-2 cursor-pointer"
                  style={{ width: "100%", height: "100%", borderLeftColor: "white" }}
                />
              </button>
            </div>
          </div>
          <div className="w-[10%] absolute inset-y-0 -translate-x-12  right-0 flex justify-between items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
              <div className=' flex'>
              <div className='font-medium rounded-md flex justify-center w-[70px] h-[40px] hover:bg-purple-900 transition-all'>
                <Link to="/login" className='w-full h-full text-center self-center content-center'>Login</Link>
              </div>
              <div className='font-medium rounded-md flex justify-center w-[70px] h-[40px] hover:bg-purple-900 transition-all'>
                <Link to="/signup" className='w-full h-full text-center self-center content-center'>Signup</Link>
              </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
