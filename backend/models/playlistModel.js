import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    songs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Song" 
    }],
});

export default mongoose.model("Playlist", playlistSchema);
