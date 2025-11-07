// // // backend/src/server.js
// import dotenv from "dotenv";
// dotenv.config();

// import app from "./app.js";
// import connectDB from "./config/db.js";

// const PORT = process.env.PORT || 5000;

// connectDB();

// app.get("/ping", (req, res) => {
//   res.send("🚀 URL Shortener Backend Running Successfully!");
// })
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


// server/src/server.js
// import app from './app.js';
// import config from './config/index.js'; // Import config for port

// const PORT = config.port;

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });

// server/src/server.js
// import app from './app.js';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// const PORT = process.env.PORT || 5000;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });


// server/src/server.js
import app from './app.js';
import config from './config/index.js'; // Import config for port

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});