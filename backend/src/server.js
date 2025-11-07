// server/src/server.js
import app from './app.js';
import config from './config/index.js'; // Import config for port

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
