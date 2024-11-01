import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function Controls() {
  return (
    <div className="controlsCont h-[10vh] border flex">
      <div className='SongDetails border w-[22%]'>
        Song Details
      </div>
      <div className='msControls border w-[56%] flex flex-col justify-center content-center gap-1'>
        <div className=' w-[30%] flex justify-between self-center'>
          <ShuffleIcon />
          <SkipPreviousIcon />
          <PlayCircleIcon />
          <SkipNextIcon />
        </div>
        
        <div className='flex justify-center w-[50%]text-center gap-1 items-center'>
          <span>0:00</span>
          <div className="flex w-[60%] h-[3px]  bg-neutral-700 rounded-full dark:bg-white border-none">
          </div>
          <span>3:00</span>
        </div>


      </div>
      <div className='Options border w-[22%] '>
        other options
      </div>
    </div>
  )
}