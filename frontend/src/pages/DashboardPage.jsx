<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import ShortenForm from "../components/ShortenForm";
import AnalyticsModal from "../components/AnalyticsModal"; // ✅ Import modal
=======
// client/src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ShortenForm from '../components/ShortenForm';
>>>>>>> 5cf4246ee368a99d580ae55c7779d211ab230ada

const DashboardPage = () => {
  const { user, token, logout } = useAuth();
  const [userLinks, setUserLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [errorLinks, setErrorLinks] = useState(null);
  const [refreshLinks, setRefreshLinks] = useState(false);

  // ✅ Analytics Modal states
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedShortCode, setSelectedShortCode] = useState(null);

  // ✅ Fetch user's shortened links
  const fetchUserLinks = useCallback(async () => {
    if (!token) {
      setLoadingLinks(false);
      return;
    }

    setLoadingLinks(true);
    setErrorLinks(null);

    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:5000/api/user/links", {
        headers: { Authorization: `Bearer ${token}` },
=======
      const response = await fetch('https://backend-url-shortener1.onrender.com/api/user/links', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
>>>>>>> 5cf4246ee368a99d580ae55c7779d211ab230ada
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch user links");

      setUserLinks(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorLinks(error.message);
      toast.error(`Error fetching links: ${error.message}`);
      if (error.message.includes("token") || error.message.includes("authorized")) logout();
    } finally {
      setLoadingLinks(false);
    }
  }, [token, logout]);

  useEffect(() => {
    fetchUserLinks();
  }, [fetchUserLinks, refreshLinks]);

  const handleLinkShortened = () => setRefreshLinks((prev) => !prev);

  // ✅ Copy to clipboard
  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied to clipboard!");
  };

  // ✅ Open Analytics Modal
  const openAnalyticsModal = (shortCode) => {
    setSelectedShortCode(shortCode);
    setShowAnalytics(true);
  };

  // ✅ Close Analytics Modal
  const closeAnalyticsModal = () => {
    setShowAnalytics(false);
    setSelectedShortCode(null);
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-xl text-gray-300">
        Please log in to view your dashboard.
      </div>
    );
  }

  return (
    <div className="container  dark:bg-dark-bg mx-auto px-4 py-8 text-light-text relative md:pt-20 pt-16 custom-scrollbar">
      <div className="flex">
      <h1 className="text-4xl font-extrabold mb-8 gradient-text text-center md:text-left">
        Welcome, {user.username} 
      </h1>
      <h1 className="text-4xl ">👋</h1>
      </div>

      {/* ✅ Shorten New Link Section */}
      <div className=" bg-gray-300 dark:bg-dark-card p-6 rounded-lg shadow-xl mb-8 border border-gray-700">
        <h2 className="text-2xl dark:text-gray-300 text:bg-dark-bg font-semibold mb-4">Shorten a New Link</h2>
        <ShortenForm onLinkShortened={handleLinkShortened} />
      </div>

      {/* ✅ Display User Links */}
      <div className=" bg-gray-300 dark:bg-dark-card p-6 rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-2xl dark:text-gray-300 text:bg-dark-bg font-semibold mb-4">Your Shortened Links</h2>

        {loadingLinks ? (
          <p className="text-center text-gray-400">Loading your links...</p>
        ) : errorLinks ? (
          <p className="text-red-500 text-center">Error: {errorLinks}</p>
        ) : userLinks.length === 0 ? (
          <p className="text-center text-gray-400">
            You haven't shortened any links yet. Start above!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">QR Code</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Original URL</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Short URL</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Expires</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {userLinks.map((link) => (
                  <tr key={link._id} className="hover:bg-gray-200  dark:hover:bg-gray-800 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {link.qrCode ? (
                        <img
                          src={link.qrCode}
                          alt="QR Code"
                          className="w-12 h-12 rounded-md border border-gray-700"
                        />
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 truncate max-w-[220px]">
                      <a
                        href={link.longUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary-purple"
                      >
                        {link.longUrl}
                      </a>
                    </td>
<<<<<<< HEAD
                    <td className="px-6 py-4 text-sm font-medium text-primary-purple">
                      <a
                        href={link.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {link.shortUrl}
=======
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-purple">
                      <a href={`https://backend-url-shortener1.onrender.com/${link.shortCode}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {`https://backend-url-shortener1.onrender.com/${link.shortCode}`}
>>>>>>> 5cf4246ee368a99d580ae55c7779d211ab230ada
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm dark:text-gray-300 text:bg-dark-bg">{link.clicks ?? 0}</td>
                    <td className="px-6 py-4 text-sm dark:text-gray-300 text:bg-dark-bg">
                      {link.expiresAt ? new Date(link.expiresAt).toLocaleDateString() : "No Expiry"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium flex gap-3">
                      <button
                        onClick={() => openAnalyticsModal(link.shortCode)} // ✅ Open modal instead of navigating
                        className="text-indigo-500 hover:text-indigo-400"
                      >
                        Analytics
                      </button>
                      <button
                        onClick={() => handleCopy(link.shortUrl)}
                        className="text-green-500 hover:text-green-400"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Analytics Modal */}
      {showAnalytics && (
        <AnalyticsModal
          shortCode={selectedShortCode}
          onClose={closeAnalyticsModal}
        />
      )}
    </div>
  );
};

export default DashboardPage;
