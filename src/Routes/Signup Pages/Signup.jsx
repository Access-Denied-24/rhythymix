// import { Link } from 'react-router-dom';
// import styles from '../../Components/login.module.css';

// export default function Signup(){
//   return (
//     <div className={styles.loginPage}>
//       <h1>SIGNUP PAGE</h1>

//       <div className={styles.container}>
//         <input type="text" placeholder='Username' />
//         <input type="text" placeholder='Email' />
//         <input type="password" placeholder='Password' />
//         <input type="password" placeholder='Confirm Password' />
        
//         <button>Sign Up</button>

//         <Link to="/login" style={{color: 'white', textDecoration: 'none'}} >
//             <span>Already have an account? Login</span>
//           </Link>


//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../Components/login.module.css';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData); // Connect to your backend API
      console.log(response.data);
      navigate('/login'); // Redirect to login on success
    } catch (err) {
      console.error('Signup Error:', err);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1>SIGNUP PAGE</h1>
      <div className={styles.container}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
        <button onClick={handleSubmit}>Sign Up</button>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          <span>Already have an account? Login</span>
        </Link>
      </div>
    </div>
  );
}
