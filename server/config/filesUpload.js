const multer = require("multer");
const cloudinaryV2 = require("cloudinary").v2;
const cloudinaryStorage =
  require("multer-storage-cloudinary").CloudinaryStorage;

// Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Storage engine
const storage = new cloudinaryStorage({
  cloudinary: cloudinaryV2,
  allowedFormats: ["jpg", "jpeg", "png"],
  params: {
    folder: "ecommerce-app",
  },
});

// Initializing multer with storage engine
const upload = multer({
  storage,
});

module.exports = upload;
