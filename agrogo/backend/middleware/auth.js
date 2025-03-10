const jwt = require('jsonwebtoken');
const User = require('../models/User');


// const authMiddleware = async (req, res, next) => {
//   const token = req.header('Authorization');

const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Remove the 'Bearer ' prefix
  

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {

    let pureToken = token;
    if (token.startsWith('Bearer ')) {
      pureToken = token.split(' ')[1];
    }
    const decoded = jwt.verify(pureToken, 'vau@group14');
    

    //  check whether the the user in DB
    //const user = await User.findById(decoded.userId).select('-password');
    const user =  User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();

    // const decoded = jwt.verify(token, 'vau@group14');
    // req.user = decoded;  // Attach the decoded token data (user info) to the request
    // next();  // Call the next middleware or route handler

  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;









// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
  
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'vau@group14');
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;
