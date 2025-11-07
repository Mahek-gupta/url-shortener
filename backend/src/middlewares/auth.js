// server/src/middlewares/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/index.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Get token from header

      const decoded = jwt.verify(token, config.jwtSecret); // Verify token

      req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  // Example for admin check (assuming user model has isAdmin field)
  // if (req.user && req.user.isAdmin) {
  //   next();
  // } else {
  //   res.status(403).json({ message: 'Not authorized as an admin' });
  // }
  next(); // For now, just pass through
};

export { protect, admin };