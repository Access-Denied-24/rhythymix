import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const navigate = useNavigate();
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "517474185886-t933l3m5ab8qqnb58oj1nvejjvmvf1ce.apps.googleusercontent.com",
      callback: handleGoogleResponse,  // Callback when login is successful
    });
    google.accounts.id.renderButton(document.getElementById('google-signin'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  async function handleGoogleResponse(response) {
    
    const googleToken = response.credential; // Assuming response contains the ID token in credential
  
    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/google', {
        token: googleToken,
      });
      console.log('User authenticated successfully:', res.data);

      localStorage.setItem('token', res.data.token);
      console.log('Token saved to localStorage:', localStorage.getItem('token'));
      console.log('User data:', res.data);
      if(res.data) navigate('/');
      // Use the token or any user data returned by the server here
    } catch (error) {
      console.error('Error authenticating user with Google:', error);
    }
  }

  return <div className="text-black" id="google-signin">Continure with google</div>;
};

export default GoogleLogin;
