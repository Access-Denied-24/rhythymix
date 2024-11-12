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
            alert('Login to create playlist');
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

            // console.log(response.data);  

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center z-10">
            <div className="bg-white rounded-lg p-6 w-1/3 ">
                <h3 className="text-xl font-bold mb-4 text-black">Create New Playlist</h3>
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
                    <div className="flex justify-between space-x-2">
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
