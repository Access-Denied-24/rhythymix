import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../../Components/login.module.css';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestResetLink = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/forgotPassword", { email });
      setMessage(res.data.msg);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
      setMessage('');       
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1 className='font-bold'>FORGOT PASSWORD</h1>

      <div className={styles.container}>
        <input
          type="text"
          placeholder="Enter Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button onClick={handleRequestResetLink}>Request Reset Link</button>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
}

// import { Link } from 'react-router-dom';
// import styles from '../../Components/login.module.css';
// import { useState } from 'react';
// import { stringify } from 'postcss';
// import { requestPasswordReset } from '../../api/userAPI';

// export default function ForgotPass(){
//   const [ email, setEmail ] = useState('');
//   const [ message, setMessage ] = useState('');

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     setMessage('');
    
//     try{
//       const response = await fetch('api', {
//         method: "POST",
//         headers: {
//           'Content-type': 'application/json'
//         },
//         body: JSON.stringify({email}),
//       });
      
//       if(response.ok) setMessage('Reset link sent to email.')
//       else setMessage('Error: unable to send reset link')
//   }
//   catch(error){
//     setMessage('Error : ' + error.message);
//   }
// };
  
//   return (
//     <div className={styles.loginPage}>
//       <h1>Forgot Password PAGE</h1>

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
//   );
// }