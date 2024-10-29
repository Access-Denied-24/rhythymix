import { Link } from 'react-router-dom';
import styles from '../../Components/login.module.css';

export default function ForgotPass(){
  return (
    <div className={styles.loginPage}>
      <h1>Forgot Password PAGE</h1>

      <div className={styles.container}>
        <input type="text" placeholder='Enter Email ID' />
        {/* <input type="password" placeholder='Password' /> */}
        
        
        <button>Request Reset Link</button>

        <Link to="/login" style={{color: 'white', textDecoration: 'none'}} >
            <span>Back to Login</span>
          </Link>


      </div>
    </div>
  );
}