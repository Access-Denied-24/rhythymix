// controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


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
        if (!isMatch) return res.status(400).json({ msg: "Wrong Password" });
        
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
    const { username, interests, password, newPassword } = req.body;
  
    try {
      let user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      // Update username and interests if provided
      user.username = username || user.username;
      user.interests = interests || user.interests;
  
      // Update password if current password and new password are provided
      if (password && newPassword) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });
        
        // Hash new password and update
        user.password = await bcrypt.hash(newPassword, 10);
      }
  
      await user.save();
  
      // Send updated user information
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

// getting profile info
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
            likedSongs: user.likedSongs,
            playlists: user.playlists,
            songHistory: user.songHistory,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

<<<<<<< HEAD
// forgotPassword

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;
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


=======
// Request Password Reset
// export const requestPasswordReset = async (req, res) => {
//     const { email } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ msg: "User not found" });
  
//     //   const token = crypto.randomBytes(32).toString('hex');
//     //   user.resetToken = token;
//     //   user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
//     //   await user.save();
  
//     //   await sendResetEmail(user.email, token);
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
//         console.log(token);
  
//       res.status(200).send('Reset link sent to your email.');
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   };
  
  // Reset Password
//   export const resetPassword = async (req, res) => {
//     const { token, newPassword } = req.body;
  
//     try {
//       const user = await User.findOne({
//         resetToken: token,
//         resetTokenExpiration: { $gt: Date.now() },
//       });
  
//       if (!user) {
//         return res.status(400).send('Invalid or expired token');
//       }
  
//       user.password = await bcrypt.hash(newPassword, 10);
//       user.resetToken = undefined; // Clear reset token
//       user.resetTokenExpiration = undefined; // Clear expiration
//       await user.save();
  
//       res.status(200).send('Password has been reset successfully.');
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   };

// export const requestPasswordReset = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ msg: "User not found" });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
//         // Set up your transporter for nodemailer here
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         // Email options
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Password Reset Request',
//             text: `Click this link to reset your password: http://localhost:3000/resetpass?token=${token}`
//         };

//         // Send email
//         await transporter.sendMail(mailOptions);
//         res.json({ msg: "Reset link sent" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server error");
//     }
// };

// export const resetPassword = async (req, res) => {
//     const { token, newPassword } = req.body;
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user) return res.status(404).json({ msg: "User not found" });

//         user.password = await bcrypt.hash(newPassword, 10);
//         await user.save();
//         res.json({ msg: "Password reset successfully" });
//     } catch (error) {
//         console.error('Error during token verification:', error);
//         res.status(500).json({ msg: "Invalid token or server error" });
//     }
// };
>>>>>>> 75b544db (ui fixes)
