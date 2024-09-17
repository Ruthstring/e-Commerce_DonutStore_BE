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



module.exports = authMiddleware;