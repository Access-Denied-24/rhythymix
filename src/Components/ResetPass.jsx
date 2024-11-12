import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/v1/users/resetPassword/${token}`, { password });
      setMessage(response.data.msg);
      setTimeout(() => navigate('/login'), 5173); // Redirect to login after successful reset
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">RESET PASSWORD</h1>

      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md text-center">
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-left mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6">
          <a href="/login" className="text-blue-400 hover:text-blue-500 transition duration-300">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
