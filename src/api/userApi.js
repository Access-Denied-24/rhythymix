// src/api/userApi.js
import axios from 'axios';

// Request password reset
export const requestPasswordReset = async (email) => {
  
  try {
    const response = await axios.post('/api/request-reset', { email });
    return response.data; // Success message
  } catch (error) {
    throw error.response.data; // Error message
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post('/api/reset-password', { token, newPassword });
    return response.data; // Success message
  } catch (error) {
    throw error.response.data; // Error message
  }
};