const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');


const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check if the authorization header exists
  if (!authorization) {
    return res.status(401).json({ error: 'Not Authorized, missing token' });
  }

  const token = authorization.split(' ')[1]; // Get the token part

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    const user = await User.findById(decodedToken.id); // Fetch the user using the decoded ID

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Not Authorized, user not found' });
    }

    // Attach the user to the request
    req.user = user;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.log('Error in authentication:', error.message);
    return res.status(401).json({ error: 'Invalid token or session expired' });
  }
};

// const authMiddleware = async (req, res, next) => {
//   const { authorization } = req.headers;

//   // Log the authorization header to see if it contains the token
//   console.log('Authorization Header:', authorization);

//   if (!authorization) {
//     return res.status(401).json({ error: 'Not Authorized, missing token' });
//   }
//   const token = authorization.split(' ')[1];

//   try {
//     // Log the token for debugging purposes
//     console.log('JWT Token:', token);
    
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decodedToken.id);
//     console.log('Authenticated user:', req.user); // Debug log
//     if (!user) {
//       throw new Error('User not found');
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ error: "invalid token or session expired" });
//   }
// };

module.exports = authMiddleware;