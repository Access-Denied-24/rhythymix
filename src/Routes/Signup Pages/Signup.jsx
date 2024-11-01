<<<<<<< HEAD
import { Link, useNavigate} from 'react-router-dom';
=======
<<<<<<< HEAD
import { Link } from 'react-router-dom';
>>>>>>> c3a82769 (ui fixes)
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
      <h1>SIGNUP PAGE</h1>

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


// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from '../../Components/login.module.css';

// export default function Signup() {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('/api/register', formData); // Connect to your backend API
  //     console.log(response.data);
  //     navigate('/login'); // Redirect to login on success
  //   } catch (err) {
  //     console.error('Signup Error:', err);
  //   }
  // };

  // return (
  //   <div className={styles.loginPage}>
  //     <h1>SIGNUP PAGE</h1>
  //     <div className={styles.container}>
  //       <input type="text" name="username" placeholder="Username" onChange={handleChange} />
  //       <input type="email" name="email" placeholder="Email" onChange={handleChange} />
  //       <input type="password" name="password" placeholder="Password" onChange={handleChange} />
  //       <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
  //       <button onClick={handleSubmit}>Sign Up</button>
  //       <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
  //         <span>Already have an account? Login</span>
  //       </Link>
  //     </div>
//     </div>
//   );
// }
=======
import { Link } from 'react-router-dom';
import styles from '../../Components/login.module.css';
import { useState } from 'react';
// import axios from 'axios';

export default function Signup(){
  const [ username, setUsername ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  const handleSubmit = (e) => {
    // e.preventDefault();
  }
  return (
    <div className={styles.loginPage}>
      <h1>SIGNUP PAGE</h1>

      <div className={styles.container} onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' onChange={(e) => {setUsername(e.target.value)}} />

        <input type="text" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />

        <input type="password" placeholder='Password' />
        <input type="password" placeholder='Confirm Password' onChange={(e) => {setPassword(e.target.value)}} />
        
        <button type='submit'>Sign Up</button>

        <Link to="/login" style={{color: 'white', textDecoration: 'none'}} >
            <span>Already have an account? Login</span>
          </Link>


      </div>
    </div>
  );
}
>>>>>>> 75b544db (ui fixes)
