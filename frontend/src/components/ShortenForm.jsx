<<<<<<< HEAD
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../context/AuthContext";
import AnalyticsModal from "./AnalyticsModal";

=======
// client/src/components/ShortenForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get the token

// Accept onLinkShortened prop
>>>>>>> 5cf4246ee368a99d580ae55c7779d211ab230ada
const ShortenForm = ({ onLinkShortened }) => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const { token, isAuthenticated } = useAuth();

  // ✅ Handle URL shortening
  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!longUrl.trim()) {
      toast.error("Please enter a valid URL.");
      setLoading(false);
      return;
    }

    try {
      const headers = { "Content-Type": "application/json" };
      if (isAuthenticated && token)
        headers["Authorization"] = `Bearer ${token}`;

<<<<<<< HEAD
      const response = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers,
        body: JSON.stringify({ longUrl, customAlias, expiresAt }),
=======
      const response = await fetch('https://backend-url-shortener1.onrender.com/api/shorten', {
        method: 'POST',
        headers: headers, // Use the headers object
        body: JSON.stringify({ longUrl }),
>>>>>>> 5cf4246ee368a99d580ae55c7779d211ab230ada
      });

      const data = await response.json();
<<<<<<< HEAD
      if (!response.ok) throw new Error(data.message || "Failed to shorten URL");
=======
      setShortUrl(`https://backend-url-shortener1.onrender.com/${data.shortCode}`);
      toast.success('URL shortened successfully!');
>>>>>>> 5cf4246ee368a99d580ae55c7779d211ab230ada

      setShortUrl(data.shortUrl);
      setQrCode(data.qrCode);
      toast.success("URL shortened successfully!");

      if (onLinkShortened) onLinkShortened();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  const getShortCode = () => {
    try {
      const parts = shortUrl.split("/");
      return parts.pop() || parts.pop();
    } catch {
      return "";
    }
  };

  return (
    <motion.form
      onSubmit={handleShorten}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="
        mt-8 p-8 rounded-3xl border 
        backdrop-blur-xl bg-white/15 dark:bg-gray-900/40
        border-white/20 shadow-lg 
        hover:shadow-2xl 
        transition-all duration-500 
        text-center relative overflow-hidden
      "
    >
      {/* ✨ Soft gradient glow background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>

      {/* 🔗 Input Fields */}
      <div className="flex flex-col gap-4">
        <input
          type="url"
          placeholder="Enter your long URL (e.g. https://example.com)"
          className="
            p-3 rounded-lg border border-white/20
            bg-white/20 dark:bg-gray-800/40 
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none
            transition-all duration-300
          "
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Custom alias (optional)"
          className="
            p-3 rounded-lg border border-white/20
            bg-white/20 dark:bg-gray-800/40 
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none
            transition-all duration-300
          "
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
        />

        <input
          type="date"
          className="
            p-3 rounded-lg border border-white/20
            bg-white/20 dark:bg-gray-800/40 
            text-gray-900 dark:text-gray-100
            focus:ring-2 focus:ring-purple-500 focus:outline-none
            transition-all duration-300
          "
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-6 py-3 rounded-full font-semibold
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white shadow-lg hover:shadow-purple-500/40
            transition-all duration-300 disabled:opacity-50
          "
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </motion.button>
      </div>

      {/* 🔗 Shortened Result */}
      {shortUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
            mt-6 p-5 rounded-xl border border-white/20 
            bg-white/20 dark:bg-gray-800/40 
            shadow-inner backdrop-blur-lg
          "
        >
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline break-all block mb-2"
          >
            {shortUrl}
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="
              mb-3 px-4 py-2 rounded-md 
              bg-gray-200/20 dark:bg-gray-700/40 
              text-gray-900 dark:text-gray-200 
              hover:bg-gray-300/30 dark:hover:bg-gray-600/40 
              transition-all duration-300
            "
          >
            Copy
          </button>

          {/* 💎 Holographic QR Card with 3D tilt + Glow */}
          <motion.div
            className="
              relative inline-block p-[2px] rounded-2xl 
              bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
              mx-auto
            "
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              rotateX: -5,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div
              className="
                bg-white/10 dark:bg-gray-800/50 
                rounded-2xl p-4 backdrop-blur-md shadow-inner
              "
            >
              {qrCode ? (
                <img src={qrCode} alt="QR Code" className="w-32 h-32 mx-auto" />
              ) : (
                <QRCodeCanvas value={shortUrl} size={128} />
              )}
            </div>

            {/* ✨ Animated Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/40 to-pink-400/40 blur-lg -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <p className="text-gray-400 mt-2 text-sm">
            Scan this QR to open the link
          </p>

          <button
            type="button"
            onClick={() => setShowAnalytics(true)}
            className="
              mt-4 px-5 py-2 rounded-md font-medium
              bg-gradient-to-r from-purple-600 to-pink-500 
              text-white hover:from-purple-700 hover:to-pink-600 
              shadow-lg hover:shadow-purple-500/30
              transition-all duration-300
            "
          >
            View Analytics
          </button>
        </motion.div>
      )}

      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

      {/* 🧠 Analytics Modal */}
      {showAnalytics && (
        <AnalyticsModal
          shortCode={getShortCode()}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </motion.form>
  );
};

export default ShortenForm;
