// import React, { useState } from 'react';
// import axios from 'axios';

// const CreatePlaylistForm = ({ onPlaylistCreated }) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [ playlist, setPlaylist ] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/api/v1/playlists/createPlaylist', 
//                 { name, description },
//                 { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//             );
            
//             console.log("Create Playlist Response:", response.data);
//             if (response.data.success) {
//             console.log("Playlist created successfully!");
//             setPlaylist([...playlists, response.data.playlist]);
//             } else {
//             console.log("Failed to create playlist:", response.data.message);
//             }
//         } catch (error) {
//             console.error("Error creating playlist:", error.response?.data || error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className=' text-sky-950 top-40 relative'>
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

// export default CreatePlaylistForm;

import React, { useState } from 'react';
import axios from 'axios';

const CreatePlaylistForm = ({ onPlaylistCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [playlists, setPlaylists] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found in localStorage");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v1/playlists/createPlaylist', 
                { name, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Create Playlist Response:", response);  // Log full response
            console.log("Response Data:", response.data);  // Log response data

            if (response.data.success) {
                console.log("Playlist created successfully!");
                setPlaylists([...playlists, response.data.playlist]);  // Update local state
                // or call onPlaylistCreated if you want the parent to handle the update
                // onPlaylistCreated(response.data.playlist);
            } else {
                console.log("Failed to create playlist:", response.data.message || 'No message provided');
            }
        } catch (error) {
            // Better error handling: log complete error information
            console.error("Error creating playlist:", error.response?.data || error.message || error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="text-sky-950 top-40 relative">
            <input 
                className="bg-white"
                type="text" 
                placeholder="Playlist Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <button type="submit">Create Playlist</button>
        </form>
    );
};

export default CreatePlaylistForm;
