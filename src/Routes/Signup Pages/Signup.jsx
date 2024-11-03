import { Link, useNavigate} from 'react-router-dom';
import styles from '../../Components/login.module.css';
import { useState } from 'react';
import axios from 'axios';


export default function Signup(){

  const [formData, setFormData] = useState({
    username: '',
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

      
      await axios.post('http://localhost:8000/api/v1/users/register', formData);
      alert('Registration successful');
      navigate('/login');


    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
        alert(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        // Request was made but no response received
        console.log('Request:', error.request);
        alert('No response from server');
      } else {
        // Something happened in setting up the request
        console.log('Error:', error.message);
        alert('Login error: ' + error.message);
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1 className='font-bold'>CREATE ACCOUNT</h1>

      <form onSubmit={handleSubmit} className={styles.container}>
        <input onChange={handleChange} name="username" type="text" placeholder='Username' />
        <input onChange={handleChange} name="email" type="text" placeholder='Email' />
        <input onChange={handleChange} name="password" type="password" placeholder='Password' />
        <input onChange={handleChange} placeholder='Confirm Password' />
        
        <button>Sign Up</button>

        <Link to="/login" style={{color: 'white', textDecoration: 'none'}} >
            <span>Already have an account? Login</span>
          </Link>


      </form>
    </div>
  );
}
