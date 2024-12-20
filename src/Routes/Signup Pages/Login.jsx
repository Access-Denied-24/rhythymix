import { Link,useNavigate} from 'react-router-dom';
import styles from '../../Components/login.module.css';
import { useState } from 'react';
import axios from 'axios';
import SuccessMsg from '../../Components/SuccessMsg';
import GoogleLogin from '../../Components/googleLogin';

export default function Login(){
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', formData);
      localStorage.setItem('token', response.data.token);
      // alert('Login successful');

      const isAuthenticated = localStorage.getItem('token');
      if(isAuthenticated){
        <SuccessMsg />
      } 
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
        alert(error.response.data.message || 'Login failed: ' + error.response.data.msg);
      } else if (error.request) {
        console.log('Request:', error.request);
        alert('No response from server');
      } else {
        console.log('Error:', error.message);
        alert('Login error: ' + error.message);
        
      }
    }
  };
  return (
    <div className={styles.loginPage}>
      <h1 className='font-bold'>LOGIN</h1>

      <form onSubmit={handleSubmit} className={styles.container}>
        <input onChange={handleChange} name="email" type="text" placeholder='Email' />
        <input onChange={handleChange} name="password" type="password" placeholder='Password' />
        
        <div className={styles.rememFor}>
          <div className={styles.rememberme}>
            <input type="checkbox" />
            <span className={styles.rememberme}>Remember Me</span>
          </div>
          <Link to="/forgotpass" style={{color: 'white', textDecoration: 'none'}} >
            <span>Forgot Password</span>
          </Link>
        </div>
        <button>Login</button>

        <Link to="/signup" style={{color: 'white', textDecoration: 'none'}} >
            <span>Don't have an account? Register</span>
           
          </Link>
          <GoogleLogin className="text-center" />

      </form>
    </div>
  );
}