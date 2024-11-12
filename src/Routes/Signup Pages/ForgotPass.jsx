import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../../Components/login.module.css';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetLink, setResetLink] = useState(''); 

  const handleRequestResetLink = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/users/forgotPassword", { email });
    setMessage(res.data.msg);
      setResetLink(res.data.resetURL); 
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
      setMessage('');
      setResetLink(''); 
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1 className="font-bold">FORGOT PASSWORD</h1>

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
        
        {resetLink && (
          <p>
            <span style={{ color: 'blue' }}>Reset Link:</span>{' '}
            <a href={resetLink} target="_blank" rel="noopener noreferrer">{resetLink}</a>
          </p>
        )}

        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
}
