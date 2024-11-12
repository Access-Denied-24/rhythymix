import { Link, useNavigate } from 'react-router-dom';
import styles from '../../Components/login.module.css';
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''  
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register', {
        username,
        email,
        password
      });

      const { token, user } = response.data;
      
      
      localStorage.setItem('userToken', token);
      localStorage.setItem('userId', user.id); 

      
      alert('Registration successful!');
      navigate('/signup/interests');
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        alert(error.response.data.msg || 'Registration failed');
      } else if (error.request) {
        console.log('Request:', error.request);
        alert('No response from server');
      } else {
        console.log('Error:', error.message);
        alert('Registration error: ' + error.message);
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1 className='font-bold'>CREATE ACCOUNT</h1>

      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder='Username'
          required
        />
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder='Email'
          required
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder='Password'
          required
        />
        <input
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          placeholder='Confirm Password'
          required
        />

        <button type="submit">Sign Up</button>

        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          <span>Already have an account? Login</span>
        </Link>
      </form>
    </div>
  );
}
