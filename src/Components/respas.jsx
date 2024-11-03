// import { useState } from 'react';
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';

// export default function respas() {
//     const [newPassword, setNewPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [searchParams] = useSearchParams();
//     const token = searchParams.get('token');
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/reset-password', { token, newPassword });
//             setMessage(response.data.msg);
//         } catch (error) {
//             setMessage(error.response.data.msg || "Error resetting password");
//         }
//     };

//     return (
//         <div>
//             <h1>Reset Password</h1>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="password" 
//                     placeholder="New Password" 
//                     value={newPassword} 
//                     onChange={(e) => setNewPassword(e.target.value)} 
//                     required 
//                 />
//                 <button type="submit">Reset Password</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }
