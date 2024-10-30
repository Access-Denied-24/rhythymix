// controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register new user
export const registerUser = async (req, res) => {
    const { username, email, password, interests } = req.body;
    console.log(req.body);

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });
        
        user = new User({ username, email, password, interests });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token , user:{
        id: user.id,
        username: user.username,
        email: user.email,
        interests: user.interests,
        likedSongs: user.likedSongs,
        playlists: user.playlists,
        songHistory: user.songHistory
    }});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token , user:{
            id: user.id,
            username: user.username,
            email: user.email,
            interests: user.interests,
            likedSongs: user.likedSongs,
            playlists: user.playlists,
            songHistory: user.songHistory
        }});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Update user information
export const updateUser = async (req, res) => {
  const { username, interests } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.username = username || user.username;
    user.interests = interests || user.interests;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// controllers/userController.js
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Send user details, including liked songs and song history
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            interests: user.interests,
            likedSongs: user.likedSongs, // Include liked songs
            playlists: user.playlists,
            songHistory: user.songHistory, // Include song history
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

