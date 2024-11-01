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