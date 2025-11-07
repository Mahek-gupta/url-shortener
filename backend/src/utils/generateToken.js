// server/src/utils/generateToken.js
import jwt from 'jsonwebtoken';
import config from '../config/index.js'; // Import config for JWT secret and expiry

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

export default generateToken;