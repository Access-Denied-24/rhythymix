// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const CreatePlaylistForm = ({ onPlaylistCreated }) => {
// //     const [name, setName] = useState('');
// //     const [description, setDescription] = useState('');
// //     const [ playlist, setPlaylist ] = useState('');

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post('http://localhost:8000/api/v1/playlists/createPlaylist', 
// //                 { name, description },
// //                 { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
// //             );
            
// //             console.log("Create Playlist Response:", response.data);
// //             if (response.data.success) {
// //             console.log("Playlist created successfully!");
// //             setPlaylist([...playlists, response.data.playlist]);
// //             } else {
// //             console.log("Failed to create playlist:", response.data.message);
// //             }
// //         } catch (error) {
// //             console.error("Error creating playlist:", error.response?.data || error.message);
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit} className=' text-sky-950 top-40 relative'>
// //             <input 
// //                 className="bg-white"
// //                 type="text" 
// //                 placeholder="Playlist Name" 
// //                 value={name} 
// //                 onChange={(e) => setName(e.target.value)} 
// //                 required 
// //             />
// //             <textarea 
// //                 placeholder="Description" 
// //                 value={description} 
// //                 onChange={(e) => setDescription(e.target.value)} 
// //             />
// //             <button type="submit">Create Playlist</button>
// //         </form>
// //     );
// // };

// // export default CreatePlaylistForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// const CreatePlaylist = ({ onPlaylistCreated }) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [playlists, setPlaylists] = useState([]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const token = localStorage.getItem('token');
//         if (!token) {
//             console.log("No token found in localStorage");
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8000/api/v1/playlists/createPlaylist', 
//                 { name, description },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             console.log("Create Playlist Response:", response);  // Log full response
//             console.log("Response Data:", response.data);  // Log response data

//             if (response.data.success) {
//                 console.log("Playlist created successfully!");
//                 setPlaylists([...playlists, response.data.playlist]);  // Update local state
//                 // or call onPlaylistCreated if you want the parent to handle the update
//                 // onPlaylistCreated(response.data.playlist);
//             } else {
//                 console.log("Failed to create playlist:", response.data.message || 'No message provided');
//             }
//         } catch (error) {
//             // Better error handling: log complete error information
//             console.error("Error creating playlist:", error.response?.data || error.message || error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="text-sky-950 top-20  border-white">
//             <input 
//                 className="bg-white"
//                 type="text" 
//                 placeholder="Playlist Name" 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//                 required 
//             />
//             <textarea 
//                 placeholder="Description" 
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//             />
//             <button type="submit">Create Playlist</button>
//         </form>
//     );
// };

// export default CreatePlaylist;

// import React, { useState } from 'react';
// import axios from 'axios';

// const CreatePlaylist = ({ onPlaylistCreated }) => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);  // Manage loading state

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log("No token found in localStorage");
//       return;
//     }

//     setLoading(true);  // Set loading state to true when the API call is in progress

//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/playlists/createPlaylist', 
//         { name, description },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
    
//       console.log(response.data);
//       if (response.data.success && response.data.playlist) {
//         console.log("Playlist created successfully!");
//         onPlaylistCreated(response.data.playlist);  // Pass the new playlist back to the parent component
//       } else {
//         console.log("Failed to create playlist:", response.data.message || 'No message provided');
//       }
//     } catch (error) {
//       console.error("Error creating playlist:", error.response?.data || error.message || error);
//     } finally {
//       setLoading(false);  // Reset loading state
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="text-sky-950 top-20 ">
//       <input 
//         className="bg-white"
//         type="text" 
//         placeholder="Playlist Name" 
//         value={name} 
//         onChange={(e) => setName(e.target.value)} 
//         required 
//       />
//       <textarea 
//         className="bg-white"
//         placeholder="Description" 
//         value={description} 
//         onChange={(e) => setDescription(e.target.value)} 
//       />
//       <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Playlist'}</button>
//     </form>
//   );
// };

// export default CreatePlaylist;

import React, { useState } from 'react';
import axios from 'axios';

const CreatePlaylist = ({ onClose, onPlaylistCreated }) => {
    const [name, setName] = useState('');  
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);  

    const handleSubmit = async (e) => {
        e.preventDefault();  

        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found in localStorage");
            return;
        }

        if (!name) {
            console.error("Playlist name is required");
            return;  
        }

        setLoading(true);  

        console.log("Playlist name:", name); 
        try {
            const response = await axios.post('http://localhost:8000/api/v1/playlists/createPlaylist', 
                { name, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log(response.data);  

            if (response.status === 201) {
                onPlaylistCreated(prevPlaylists => [...prevPlaylists, response.data.playlist]);  
                onClose();  
            } else {
                console.error("Failed to create playlist:", response.data.message || 'No message provided');
            }
        } catch (error) {
            console.error("Error creating playlist:", error.response?.data || error.message || error);
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Playlist Name" 
                        value={name}  
                        onChange={(e) => setName(e.target.value)}  
                        className="w-full p-2 border rounded text-black"
                        required 
                    />
                    <textarea 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full p-2 border rounded text-black"
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Playlist'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylist;
