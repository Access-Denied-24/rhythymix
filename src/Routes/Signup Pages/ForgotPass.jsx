import { Link } from 'react-router-dom';
import styles from '../../Components/login.module.css';
import { useState } from 'react';
import { stringify } from 'postcss';
import { requestPasswordReset } from '../../api/userAPI';

export default function ForgotPass(){
  const [ email, setEmail ] = useState('');
  const [ message, setMessage ] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage('');
    
    try{
      const response = await fetch('api', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({email}),
      });
      
      if(response.ok) setMessage('Reset link sent to email.')
      else setMessage('Error: unable to send reset link')
  }
  catch(error){
    setMessage('Error : ' + error.message);
  }
};
  
  return (
    <div className={styles.loginPage}>
      <h1>Forgot Password PAGE</h1>

      <div>
        <form onSubmit={handleSubmit} className={styles.container}>
          <input type="email" placeholder='Enter Email ID' onChange={(e) => setEmail(e.target.value)} required />
          
          <button type='submit'>Request Reset Link</button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <Link to="/login" style={{color: 'white', textDecoration: 'none'}} >
            <span>Back to Login</span>
          </Link>


      </div>
    </div>
  );
}