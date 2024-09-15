const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');


const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Attach user to request

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Error in authentication: jwt expired');
      return res.status(401).json({ message: 'jwt expired' }); // Explicitly send this message
    }
    console.error('Error in authentication:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// const authMiddleware = async (req, res, next) => {
//   const { authorization } = req.headers;

//   // Check if the authorization header exists
//   if (!authorization) {
//     return res.status(401).json({ error: 'Not Authorized, missing token' });
//   }

//   const token = authorization.split(' ')[1]; // Get the token part

//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
//     const user = await User.findById(decodedToken.id); // Fetch the user using the decoded ID

//     // Check if the user exists
//     if (!user) {
//       return res.status(401).json({ error: 'Not Authorized, user not found' });
//     }

//     // Attach the user to the request
//     req.user = user;
//     next(); // Move to the next middleware or route handler
//   } catch (error) {
//     console.log('Error in authentication:', error.message);
//     return res.status(401).json({ error: 'Invalid token or session expired' });
//   }
// };

module.exports = authMiddleware;