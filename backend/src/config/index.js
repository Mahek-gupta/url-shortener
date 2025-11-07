// server/src/config/index.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

export default config;
