const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // this part only to store from the APP if necessary later
//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'donut_images',
//       allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
//     },
//   });
  

  
  module.exports = { cloudinary };