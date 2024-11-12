import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import { fetchSpotifySongDetails, getAllAlbumsOfArtist, getArtistDetailsById } from "../utils/spotify.js";
import  uploadOnCloudinary  from "../utils/cloudinary.js";


// Register new user
export const registerUser = async (req, res) => {
    const { username, email, password} = req.body;
    console.log(req.body);

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });
        
        user = new User({ username, email, password});
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
        songHistory: user.songHistory,
        followedArtists:user.followedArtists
    }});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// select interest
export const selectInterests = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { interests } = req.body; 

    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ message: 'Please select at least one interest.' });
    }

    
    const user = await User.findByIdAndUpdate(
      userId,
      { interests },
      { new: true } 
    );

    res.status(200).json({ message: 'Interests saved successfully', interests: user.interests });
  } catch (error) {
    console.error('Error setting interests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Wrong Password" });
        
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token , user:{
            id: user.id,
            username: user.username,
            email: user.email,
            interests: user.interests,
            profileImage: user.profileImage,
            likedSongs: user.likedSongs,
            playlists: user.playlists,
            songHistory: user.songHistory,
            followedArtists:user.followedArtists
        }});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};


// Update user information
export const updateUser = async (req, res) => {
    const { username, interests, password, newPassword } = req.body;
  
    try {
      let user = await User.findById(req.user.id);
      if(!user) return res.status(404).json({ msg: "User not found" });
  
      user.username = username || user.username;
      user.interests = interests || user.interests;

      if(password && newPassword){
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });
    
        user.password = await bcrypt.hash(newPassword, 10);
      }
  
      await user.save();
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        interests: user.interests,
        likedSongs: user.likedSongs,
        playlists: user.playlists,
        songHistory: user.songHistory,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

  export const uploadProfileImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      console.log(cloudinaryResponse)

      if (!cloudinaryResponse) {
        return res.status(500).json({ message: "Error uploading to Cloudinary" });
      }

      const user= await User.findById(req.user.id);
      if(!user){
          return res.status(404).json({ message: "User not found" });
      }

      user.profileImage = cloudinaryResponse;
      await user.save();
      console.log(user);

      return res.status(200).json({
        message: "Profile image uploaded successfully",
        profileImage: cloudinaryResponse,
      });
    } catch (error) {
      console.error("Error in uploadProfileImage:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  };
// getting profile info
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ msg: "User not found" });
  
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            interests: user.interests,
            likedSongs: user.likedSongs,
            playlists: user.playlists,
            songHistory: user.songHistory,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// forgotPassword

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });

//     const resetURL = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;
//     const message = `You requested a password reset. Click here to reset your password: \n\n ${resetURL}`;

//     await sendEmail({ email: user.email, subject: "Password Reset", message });

//     res.json({ msg: "Password reset link sent to your email" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    const message = `You requested a password reset. Click here to reset your password: \n\n ${resetURL}`;

    await sendEmail({ email: user.email, subject: "Password Reset", message });

    res.json({ msg: "Password reset link sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// resetPassword
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ msg: "Password has been reset successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


// lile, unlike nad liked Playlist feature 

// Like a song
export const likeSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message: 'User not found' });
    
    if (!user.likedSongs.includes(songId)) {
      user.likedSongs.push(songId);
      await user.save();
    }

    res.status(200).json({ success: true, message: 'Song liked' });
  } catch (error) {
    console.error("Error liking song:", error.message);
    res.status(500).json({ error: 'Failed to like song' });
  }
};

// Unlike a song
export const unlikeSong = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    user.likedSongs = user.likedSongs.filter(id => id !== songId);
    await user.save();

    res.status(200).json({ success: true, message: 'Song unliked' });
  } catch (error) {
    console.error("Error unliking song:", error.message);
    res.status(500).json({ error: 'Failed to unlike song' });
  }
};

// Get liked songs with full details
export const getLikedSongs = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user.likedSongs || !user.likedSongs.length) {
      return res.json({ likedSongs: [] });
    }

    const likedSongsDetails = await Promise.all(
      user.likedSongs.map(async (songId) => {
        try {
          const songDetails = await fetchSpotifySongDetails(songId);
          return songDetails;
        } catch (error) {
          console.error(`Error fetching details for song ID ${songId}:`, error.message);
          return null; 
        }
      })
    );

    // Filter out null values if any song failed to fetch details
    const validLikedSongs = likedSongsDetails.filter(song => song !== null);

    res.json({ likedSongs: validLikedSongs });
  } catch (error) {
    console.error("Error fetching liked songs:", error.message);
    res.status(500).json({ error: 'Failed to retrieve liked songs' });
  }
};


// User Song History

export const addToHistory = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user.songHistory.includes(songId)) {
      user.songHistory.push(songId);
      await user.save();
    }

    res.status(200).json({ success: true, message: 'Song Added to History' });
  } catch (error) {
    console.error("Error  in adding song to History:", error.message);
    res.status(500).json({ error: 'Failed to add in History' });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user.songHistory || !user.songHistory.length) {
      return res.json({ songHistory: [] });
    }

    const songHistoryDetails = await Promise.all(
      user.songHistory.map(async (songId) => {
        try {
          const songDetails = await fetchSpotifySongDetails(songId);
          return songDetails;
        } catch (error) {
          console.error(`Error fetching details for song ID ${songId}:`, error.message);
          return null;
        }
      })
    );

    const validSongHistory = songHistoryDetails.filter(song => song !== null);

    res.json({ songHistory: validSongHistory });
  } catch (error) {
    console.error("Error fetching song history:", error.message);
    res.status(500).json({ error: 'Failed to retrieve song history' });
  }
};


// for following 

// Follow an artist
export const followArtist = async (req, res) => {
  try {
    const { artistId } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message: 'User not found' });

    if(user.followedArtists.includes(artistId)){
      return res.status(400).json({ message: 'Already following this artist' });
    }
    user.followedArtists.push(artistId);
    await user.save();
    res.status(200).json({ message: 'Artist followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error following artist' });
  }
};

// Unfollow an artist
export const unfollowArtist = async (req, res) => {
  try {
    const { artistId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.followedArtists = user.followedArtists.filter(id => id !== artistId);
    await user.save();
    res.status(200).json({ message: 'Artist unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error unfollowing artist' });
  }
};

// Get followed artists with albums
export const getFollowedArtists = async (req, res) => {
  try {
    const userId=req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch artist details and albums for each followed artist
    const artistDetails = await Promise.all(user.followedArtists.map(async (artistId) => {
      const artistData = await getArtistDetailsById(artistId);  
      const albums = await getAllAlbumsOfArtist(artistId);
      return { artist: artistData, albums: albums.items};
    }));

    res.status(200).json({ followedArtists: artistDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching followed artists' });
  }
};
