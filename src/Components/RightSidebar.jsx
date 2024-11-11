import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function RightSidebar(){
  return (
    <>
  <div className="absolute hidden right-0 bottom-[10%] overflow-auto top-[89px] lg:flex flex-col bg-clip-border rounded-xl text-white w-60 p-4 shadow-xl shadow-blue-gray-900/5" style={{backgroundColor:"#1B0025"}}>
    <div className="mb-2 p-4">
      <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white font-bold">
        Active Songs
      </h5>
    </div>
    <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-white">

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80 "
      >
        <div className="grid place-items-center mr-4">
          {/* <AccountCircleIcon /> */}
        </div>
        Lyrics
      </div>
      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="grid place-items-center mr-4">
          {/* <SettingsIcon /> */}
        </div>
        Song Details
      </div>
      
      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="grid place-items-center mr-4">
          {/* <SettingsIcon /> */}
        </div>
        Artist Details
      </div>

      <div // logout
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="grid place-items-center mr-4">
          {/* <PowerSettingsNewIcon /> */}
        </div>
        Next in Queue
      </div>
    </nav>
  </div>
   
    </>
  );
}