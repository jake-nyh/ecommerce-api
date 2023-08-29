require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_USER_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SEC
  });

module.exports = cloudinary