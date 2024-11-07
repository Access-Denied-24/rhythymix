// index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import playlistRoutes from './routes/playlistRoutes.js'
import spotifyRoutes from './routes/spotifyRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/playlists', playlistRoutes);
app.use('/api/v1/spotify', spotifyRoutes)

app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()"); // Adjust as necessary
    next();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

