import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function Modal( {setNewName, onClose} ){
  const [ open, setOpen ] = useState(true);
  // const [ newName, setNewName ] = useState('');

  const handleClose = () => {
    setOpen(false);
    onClose();
  }

  return(
    <div className="MCont">
      <Dialog open={open} onClose={handleClose} className=" w-[40%] flex justify-center bg-[#22072b] rounded-xl border absolute top-[40vh] left-[30vw] z-2">
        <DialogPanel className="flex flex-col p-2 items-center">

          <DialogTitle>Change Username</DialogTitle>

          <input type="text" placeholder="Enter name" onChange={(e) => {setNewName(e.target.value);}} className="bg-white text-black w-[80%] rounded-lg p-1 px-3 m-2" />

          <div className="buttons flex justify-between w-[90%]">
            <button type="button" onClick={(handleClose)}>Save</button>

            <button type="button" onClick={handleClose}>Cancel</button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
}