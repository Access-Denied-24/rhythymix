import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("Local file path is required.");
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // Log the uploaded file URL for verification
        console.log("File uploaded successfully:", response.secure_url);

<<<<<<< HEAD
=======
        // Delete the local file after successful upload
>>>>>>> 67e2a54f (Fixed upload photo + playlist)
        fs.unlinkSync(localFilePath);

        return response.secure;

    } catch (error) {
        // Delete local file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.error("Error uploading to Cloudinary:", error.message);
        return null;
    }
};

export default uploadOnCloudinary;
