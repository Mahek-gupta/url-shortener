
// server/src/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import config and DB connection
import config from './config/index.js';
import connectDB from './config/db.js';

// Import routes
import urlRoutes from './routes/urlRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Import error handling middleware
import { notFound, errorHandler } from './middlewares/errorHandler.js';

dotenv.config(); // Load environment variables
connectDB();    // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cors());         // Enable CORS for frontend communication

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes (e.g., /api/auth/register, /api/auth/login)
app.use('/api', urlRoutes);       // API routes for shortening and analytics (e.g., /api/shorten, /api/analytics/:code)

// Catch-all for short link redirection. This must be after /api routes
// otherwise it might try to redirect /api/shorten as a short code.
app.use('/', urlRoutes);

// Error Handling Middleware (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;








