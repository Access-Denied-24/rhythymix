// import { useState } from 'react';
// import styles from '../Components/login.module.css';
// import { useLocation } from 'react-router-dom';
// import { resetPassword } from '../../backend/controllers/userControllers';

// export default function ResetPass() {
//   const [ newPassword, setNewPassword ] = useState('');
//   const [ message, setMessage ] = useState('');
//   const query = new URLSearchParams(useLocation().search);
//   const token = query.get('token');

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setMessage('');

//     try{
//       const response = await resetPassword(token, newPassword);
//       setMessage(response);
//     } catch(error){
//       setMessage(error);
//     }
//   };


//   return (
//     <div className={styles.loginPage}>
//       <h1>RESET Password PAGE</h1>

//       <div>
//         <form onSubmit={handleSubmit} className={styles.container}>
//           <input type="email" placeholder='Enter Email ID' onChange={(e) => setEmail(e.target.value)} required />
          
//           <button type='submit'>Request Reset Link</button>
//         </form>

//         {message && <p className={styles.message}>{message}</p>}

//         <Link to="/login" style={{color: 'white', textDecoration: 'none'}} >
//             <span>Back to Login</span>
//           </Link>


//       </div>
//     </div>
//   )
// }

// ResetPassword.js
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
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
