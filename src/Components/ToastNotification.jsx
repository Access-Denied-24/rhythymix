import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

const ToastNotification = () => {
  const showToast = () => {
    toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      className: 'bg-gray-800 text-white shadow-lg rounded-lg p-4',
      bodyClassName: 'font-semibold',
      closeButton: <FaTimes className="text-white" />
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button 
        onClick={showToast} 
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Show Toast
      </button>
      
      <ToastContainer />
    </div>
  );
};

export default ToastNotification;
