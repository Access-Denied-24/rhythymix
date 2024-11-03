import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function LeftSidebar(){
  return (
    <>
  {/* <div className="relative flex flex-col bg-clip-border rounded-xl bg-neutral-800 text-white h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"> */}
  <div className="absolute left-0 top-[89px] bottom-[10%] overflow-auto flex flex-col bg-clip-border rounded-xl  text-white w-60 p-4 shadow-xl shadow-blue-gray-900/5" style={{backgroundColor:"#1B0025"}}>
    <div className="mb-2 p-4">
      <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-white font-bold">
        Your Playlists
      </h5>
    </div>
    <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-white">

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 
        focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex w-[20%] mr-4 ">
          <img src="/likedSongsIcon.webp" alt="" className='rounded-sm' />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Liked Songs</span>
          <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
        </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex mr-4 w-[40px] h-[40px] ">
          <MusicNoteIcon style={{width: "100%", height:"100%"}} />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
          <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex mr-4 w-[40px] h-[40px] ">
          <MusicNoteIcon style={{width: "100%", height:"100%"}} />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
          <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex mr-4 w-[40px] h-[40px] ">
          <MusicNoteIcon style={{width: "100%", height:"100%"}} />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
          <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex mr-4 w-[40px] h-[40px] ">
          <MusicNoteIcon style={{width: "100%", height:"100%"}} />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
          <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex mr-4 w-[40px] h-[40px] ">
          <MusicNoteIcon style={{width: "100%", height:"100%"}} />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
          <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-purple-900 hover:bg-opacity-80 focus:bg-purple-900 focus:bg-opacity-80 active:bg-purple-900 active:bg-opacity-80"
      >
        <div className="flex mr-4 w-[40px] h-[40px] ">
          <MusicNoteIcon style={{width: "100%", height:"100%"}} />
        </div>
        <div className='flex flex-col'>
          <span className='text-[18px]' style={{textDecoration:"none"}}>Playlist Name</span>
          <span style={{textDecoration:"none"}}>Playlist • 69 songs</span>
        </div>
      </div>
    </nav>
  </div>
   
    </>
  );
}