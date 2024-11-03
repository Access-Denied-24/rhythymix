import express from "express";
import auth from "../middleware/authMiddleware.js";
import { forgotPassword, getUserProfile, loginUser, registerUser, resetPassword, updateUser } from "../controllers/userControllers.js";

const router = express.Router();
// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);
// Update user routes
router.put("/update", auth, updateUser);
// profile routes 
router.get("/profile", auth, getUserProfile);
// gorgot password routes
router.post("/forgotPassword", forgotPassword);
// reset password routes
router.post("/resetPassword/:token", resetPassword);

<<<<<<< HEAD
=======
// reset password
// router.post("/request-reset", requestPasswordReset);
// router.post("/reset-password", resetPassword);

>>>>>>> 6cb34e50171e8ed6d4ea4ba0177770b6fb0219bf
export default router;
