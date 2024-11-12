import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function PasswordModal({
  currentPassword,
  newPassword,
  setCurrentPassword,
  setNewPassword,
  onSave,
  onClose,
}) {
  return (
    <Dialog open={true} onClose={onClose} className="w-[40%] flex justify-center bg-[#22072b] rounded-xl border absolute top-[40vh] left-[30vw] z-2">
      <DialogPanel className="flex flex-col p-4 items-center">
        <DialogTitle>Change Password</DialogTitle>
        
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="bg-white text-black w-[80%] rounded-lg p-2 m-2"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-white text-black w-[80%] rounded-lg p-2 m-2"
        />

        <div className="flex justify-between w-[90%] mt-4">
          <button onClick={onSave} className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded-lg">Cancel</button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
