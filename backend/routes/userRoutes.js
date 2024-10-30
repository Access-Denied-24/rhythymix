import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getUserProfile, loginUser, registerUser, updateUser } from "../controllers/userControllers.js";

const router = express.Router();
// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);
// Update user routes
router.put("/update", auth, updateUser);
// profile routes 
router.get("/profile", auth, getUserProfile);

export default router;
