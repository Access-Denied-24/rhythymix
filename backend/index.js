// index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/api/v1/users", userRoutes);

app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()"); // Adjust as necessary
    next();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

