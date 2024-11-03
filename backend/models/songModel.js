import { duration } from "@mui/material";
import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    songId : {
        type: String,
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true 
    },
    artist: { 
        type: String, 
        required: true 
    },
    album: { 
        type: String 
    },
    genre: { 
        type: String 
    },
    albumArtUrl: { 
        type: String 
    },
    duration: {
        type: Number
    }
});

export default mongoose.model("Song", songSchema);
