import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function Controls() {
  return (
    <div className="controlsCont bg-neutral-900 h-[10vh] flex z-1 fixed left-0 right-0 bottom-0 py-1">
      <div className='SongDetails p-2 w-[22%] flex'>
        <img src="/playlistPhoto1.webp" alt="" className='w-[15%] mr-4' />
        <div className='flex flex-col'>
          <span>Song name</span>
          <span>Artists name</span>
        </div>
      </div>
      <div className='msControls w-[56%] flex flex-col justify-center content-center gap-1'>
        <div className=' w-[30%] flex justify-between self-center'>
          <ShuffleIcon className='cursor-pointer' />
          <SkipPreviousIcon className='cursor-pointer'/>
          <PlayCircleIcon className='cursor-pointer'/>
          <SkipNextIcon className='cursor-pointer'/>
        </div>
        
        <div className='flex justify-center w-[50%]text-center gap-1 items-center'>
          <span>0:00</span>
          <div className="flex w-[60%] h-[3px]  bg-neutral-700 rounded-full dark:bg-white border-none cursor-pointer">
          </div>
          <span>3:00</span>
        </div>


      </div>
      <div className='Options w-[22%] flex'>
        <div className='flex justify-center w-full self-center'>
          <VolumeUpIcon style={{width:"40px", cursor:"pointer"}} />
          <div className="flex w-[60%] h-[3px]  bg-neutral-600 rounded-full dark:bg-white border-none self-center cursor-pointer">
            </div>

        </div>
      </div>
    </div>
  )
}