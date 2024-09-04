const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  // Log the authorization header to see if it contains the token
  console.log('Authorization Header:', authorization);
  if (!authorization) {
    return res.status(401).json({ error: 'Not Authorized' });
  }
  const token = authorization.split(' ')[1];

  try {
    // Log the token for debugging purposes
    console.log('JWT Token:', token);
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    console.log('Authenticated user:', req.user); // Debug log
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = authMiddleware;