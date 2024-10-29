import { Link } from 'react-router-dom';
import styles from '../../Components/login.module.css';

export default function Signup(){
  return (
    <div className={styles.loginPage}>
      <h1>SIGNUP PAGE</h1>

      <div className={styles.container}>
        <input type="text" placeholder='Username' />
        <input type="text" placeholder='Email' />
        <input type="password" placeholder='Password' />
        <input type="password" placeholder='Confirm Password' />
        
        <button>Sign Up</button>

        <Link to="/login" style={{color: 'white', textDecoration: 'none'}} >
            <span>Already have an account? Login</span>
          </Link>


      </div>
    </div>
  );
}