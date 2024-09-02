const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Received password:", password);
    
    try {
      //check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(404).json({ message: 'user already exists' });
      }
      //hash the password
      const hashedPassword = await bcrypt.hash(password.toString(), 12);
      //create a new User document in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      //create a JWT token for the new user
      const token = jwt.sign(
        { username: newUser.username, email: newUser.email, id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      //respond with the token
      res.status(201).json({ token, currentUser: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //LOGIN:
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).populate('household_id');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      //check password
      const isPasswordCorrect = await bcrypt.compare(
        password.toString(),
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      };
  
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET, // Ensure JWT_SECRET matches your .env file
        { expiresIn: '1h' } // Optional: token expiration
      );
  
      res.status(200).json({ token, currentUser: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// const generateToken = (user) => {
//   return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({ username, email, password });

//     const token = generateToken(user);

//     res.status(201).json({ token, user: { id: user._id, username, email } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = generateToken(user);

//     res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports={registerUser,loginUser}