import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    songs: [  // Store song IDs from Spotify
        { 
            type: String 
        }
    ], 
    isPublic: { 
        type: Boolean, 
        default: false 
    },
    shareableLink: { 
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

export default mongoose.model('Playlist', playlistSchema);
