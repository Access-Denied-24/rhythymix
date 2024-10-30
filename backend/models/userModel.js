
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    interests: { 
        type: [String], 
        required: true, 
        max: 3 
    },
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Song" 
    }],
    playlists: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Playlist" 
    }],
    songHistory: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Song" 
    }]
});

export default mongoose.model("User", userSchema);
