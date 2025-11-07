// client/src/components/ShortenForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get the token

// Accept onLinkShortened prop
const ShortenForm = ({ onLinkShortened }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token, isAuthenticated } = useAuth(); // Get token and auth status

  // Function to handle URL shortening
  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(''); // Clear previous short URL

    if (!longUrl.trim()) {
      setError('Please enter a URL.');
      toast.error('Please enter a URL.');
      setLoading(false);
      return;
    }

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (isAuthenticated && token) {
        headers['Authorization'] = `Bearer ${token}`; // Add token for authenticated requests
      }

      const response = await fetch('https://backend-url-shortener1.onrender.com/api/shorten', {
        method: 'POST',
        headers: headers, // Use the headers object
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(`https://backend-url-shortener1.onrender.com/${data.shortCode}`);
      toast.success('URL shortened successfully!');

      // NEW: Call the callback function if provided
      if (onLinkShortened) {
        onLinkShortened();
      }

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
      setLongUrl(''); // Clear input field after successful shorten
    }
  };

  // Modern Clipboard API copy function (unchanged)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy!');
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <motion.form
      onSubmit={handleShorten}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mt-8 p-6 bg-dark-card rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="url"
          placeholder="https://verylonglink.com/article/..."
          className="flex-grow p-3 rounded-md bg-gray-800 border border-gray-700 text-dark-text placeholder-gray-500 focus:ring-primary-purple focus:border-primary-purple outline-none"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full font-semibold transition-all duration-300
                     bg-gradient-to-r from-purple-500 to-pink-500 text-white
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten Now'}
        </motion.button>
      </div>

      {shortUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 flex items-center justify-between p-3 bg-gray-800 rounded-md border border-gray-700"
        >
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-purple hover:underline"
          >
            {shortUrl}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-4 px-4 py-2 bg-gray-700 text-dark-text rounded-md hover:bg-gray-600 transition-colors"
          >
            Copy
          </button>
        </motion.div>
      )}

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
    </motion.form>
  );
};

export default ShortenForm;
