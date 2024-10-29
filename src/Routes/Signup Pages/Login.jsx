import { Link } from 'react-router-dom';
import styles from '../../Components/login.module.css';

export default function Login(){
  return (
    <div className={styles.loginPage}>
      <h1>LOGIN PAGE</h1>

      <div className={styles.container}>
        <input type="text" placeholder='Email' />
        <input type="password" placeholder='Password' />
        
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


      </div>
    </div>
  );
}