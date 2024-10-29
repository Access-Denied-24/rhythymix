import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function LeftSidebar(){
  return (
    <>
  {/* <div className="relative flex flex-col bg-clip-border rounded-xl bg-neutral-800 text-white h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"> */}
  <div className="absolute left-0 top-[90px] bottom-0 flex flex-col bg-clip-border rounded-xl bg-neutral-800 text-white w-60 p-4 shadow-xl shadow-blue-gray-900/5">
    <div className="mb-2 p-4">
      <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white">
        Your Playlists
      </h5>
    </div>
    <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-white">

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
      >
        <div className="grid place-items-center mr-4">
          {/* <AccountCircleIcon /> */}
        </div>
        Liked Songs
      </div>
      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
      >
        <div className="grid place-items-center mr-4">
          {/* <SettingsIcon /> */}
        </div>
        Recommended Songs
      </div>

      <div // logout
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
      >
        <div className="grid place-items-center mr-4">
          {/* <PowerSettingsNewIcon /> */}
        </div>
        Recommended Albums
      </div>
    </nav>
  </div>
   
    </>
  );
}