
import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },

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
        required: function () {
            return !this.googleId; // require password if googleId is not set
    },
    profileImage: { 
        type: String
    },
    },
    interests: { 
        type: [String], 
        required: true, 
        max: 3 
    },
    likedSongs: [{
        type: String,
        default: []
    }],
    playlists: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Playlist" 
    }],
    songHistory: [{ 
        type: String ,
        default: [] 
    }],

    resetPasswordToken: String,
    resetPasswordExpires: Date
},{
    timestamps:true
});

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    return resetToken;
  };
export default mongoose.model("User", userSchema);
