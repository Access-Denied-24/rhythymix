// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";

// export default function Modal( {setNewName, onClose} ){
//   const [ open, setOpen ] = useState(true);
//   // const [ newName, setNewName ] = useState('');

//   const handleClose = () => {
//     setOpen(false);
//     onClose();
//   }
//   const handleSave = () => {
//     onClose();  
//   };

//   return(
//     <div className="MCont">
//       <Dialog open={open} onClose={handleClose} className=" w-[40%] flex justify-center bg-[#22072b] rounded-xl border absolute top-[40vh] left-[30vw] z-2">
//         <DialogPanel className="flex flex-col p-2 items-center">

//           <DialogTitle>Change Username</DialogTitle>

//           <input type="text" placeholder="Enter name" onChange={(e) => {setNewName(e.target.value);}} className="bg-white text-black w-[80%] rounded-lg p-1 px-3 m-2" />

//           <div className="buttons flex justify-between w-[90%]">
//             <button type="button" onClick={(handleSave)}>Save</button>

//             <button type="button" onClick={handleClose}>Cancel</button>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </div>
//   )
// }

// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";
// import { useUser } from "../Context/UserContext";
// import { useContext } from "react";

// export default function Modal({ onClose }) {
//   const [open, setOpen] = useState(true);
//   const { newName, setNewName} = useUser();


//   const handleClose = () => {
//     setOpen(false);
//     onClose();  // Close the modal
//   };

//   return (
//     <div className="MCont">
//       <Dialog open={open} onClose={handleClose} className=" w-[40%] flex justify-center bg-[#22072b] rounded-xl border absolute top-[40vh] left-[30vw] z-2">
//         <DialogPanel className="flex flex-col p-2 items-center">
//           <DialogTitle>Change Username</DialogTitle>

//           <input
//             type="text"
//             placeholder="Enter name"
//             onChange={(e) => setNewName(e.target.value)}  // Update the new name
//             className="bg-white text-black w-[80%] rounded-lg p-1 px-3 m-2"
//           />

//           <div className="buttons flex justify-between w-[90%]">
//             <button type="button" onClick={handleClose}>Save</button>  {/* Trigger the save */}
//             <button type="button" onClick={handleClose}>Cancel</button>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </div>
//   );
// }


import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useUser } from "../Context/UserContext";

export default function Modal({ onClose, changeUsername }) {
  const [open, setOpen] = useState(true);
  const { newName, setNewName } = useUser();

  const handleSave = () => {
    changeUsername(newName);  // Call changeUsername with the new name
    onClose();  // Close the modal
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div className="MCont">
      <Dialog open={open} onClose={handleClose} className=" w-[40%] flex justify-center bg-[#22072b] rounded-xl border absolute top-[40vh] left-[30vw] z-2">
        <DialogPanel className="flex flex-col p-2 items-center">
          <DialogTitle>Change Username</DialogTitle>

          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setNewName(e.target.value)}
            className="bg-white text-black w-[80%] rounded-lg p-1 px-3 m-2"
          />

          <div className="buttons flex justify-between w-[90%]">
            <button type="button" onClick={handleSave}>Save</button> {/* Updated to handle save */}
            <button type="button" onClick={handleClose}>Cancel</button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
