import { useState } from "react"
import Modal from "./Modal";
import ProfilePage from "../Routes/ProfilePage";

export default function ChangeName( { onClose, onNameChange } ) {
  const [ newName, setNewName ] = useState('');

  const handleSave = () => {
    onNameChange(newName);
    onClose();
  }

  return (
    <div>
      <Modal setNewName = {setNewName} onClose={handleSave} />
      {/* <ProfilePage name = {newName} /> */}
    </div>
  )
}