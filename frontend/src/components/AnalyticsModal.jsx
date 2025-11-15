import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AnalyticsModal = ({ shortCode, onClose }) => {
  const { token } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortCode || !token) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/analytics/${shortCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch analytics");

        const dailyClicksArray = Array.isArray(data.dailyClicks)
          ? data.dailyClicks
          : Object.entries(data.dailyClicks || {}).map(([date, count]) => ({
              date,
              count: typeof count === "number" ? count : 0,
            }));

        const topReferrersArray =
          Array.isArray(data.topReferrers) && data.topReferrers.length
            ? data.topReferrers
            : Object.entries(data.topReferrers || {}).map(([ref, count]) => ({
                referrer: ref,
                count,
              }));

        const topCountriesArray =
          Array.isArray(data.topCountries) && data.topCountries.length
            ? data.topCountries
            : Object.entries(data.topCountries || {}).map(([country, count]) => ({
                country,
                count,
              }));

        setAnalytics({
          ...data,
          dailyClicksArray,
          topReferrersArray,
          topCountriesArray,
        });
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortCode, token]);

  if (!shortCode) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="
          bg-white/10 dark:bg-white/5 
          backdrop-blur-2xl 
          rounded-2xl 
          shadow-xl shadow-purple-500/20 
          border border-white/20 
          p-6 w-full max-w-lg 
          max-h-[90vh] overflow-y-auto 
          custom-scrollbar
          relative
        "
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 
            text-gray-300 hover:text-white 
            bg-black/20 hover:bg-black/40 
            p-2 rounded-full 
            backdrop-blur-md
          "
        >
          ✕
        </button>

        {loading ? (
          <p className="text-center text-gray-300 animate-pulse text-lg">
            🔍 Fetching analytics...
          </p>
        ) : !analytics ? (
          <p className="text-center text-red-400 text-lg">
            No analytics found.
          </p>
        ) : (
          <>
          <div className="flex justify-center  mb-4 ">
            <div className="w-18 h-12 flex p-4 items-center justify-center rounded-full bg-purple-500/20 animate-pulse">
              <span className="text-3xl"> 📊</span>
          
            <h2 className="text-3xl pt-3 font-extrabold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Link Analytics
            </h2>
</div>
</div>
            {/* Basic Info */}
            <div className="space-y-3 text-sm p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
              <p>
                <strong>Original URL:</strong>{" "}
                <a
                  href={analytics.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline break-all"
                >
                  {analytics.longUrl}
                </a>
              </p>

              <p>
                <strong>Short URL:</strong>{" "}
                <a
                  href={analytics.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 underline break-all"
                >
                  {analytics.shortUrl}
                </a>
              </p>

              <p>
                <strong>Total Clicks:</strong>{" "}
                <span className="text-purple-300 font-semibold">
                  {analytics.totalClicks ?? 0}
                </span>
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(analytics.createdAt).toLocaleString()}
              </p>

              <p>
                <strong>Expires:</strong>{" "}
                {analytics.expiresAt
                  ? new Date(analytics.expiresAt).toLocaleDateString()
                  : "No expiry"}
              </p>
            </div>

            {/* Chart Section */}
            {analytics.dailyClicksArray?.length > 0 ? (
              <div className="mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md">
                <h3 className="text-lg font-semibold text-center mb-2">
                  📅 Daily Clicks
                </h3>

                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={analytics.dailyClicksArray}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        background: "#1f1f1f",
                        border: "1px solid #555",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#a855f7"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-400 mt-4 text-center">
                No daily click data yet.
              </p>
            )}

            {/* Top Referrers */}
            {analytics.topReferrersArray?.length > 0 && (
              <div className="mt-6 bg-white/5 p-4 backdrop-blur-md border border-white/10 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-center mb-2">
                  🌐 Top Referrers
                </h3>

                <ul className="text-sm space-y-2">
                  {analytics.topReferrersArray.map((ref, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b border-white/10 pb-1"
                    >
                      <span className="truncate w-2/3">
                        {ref.referrer === "Direct"
                          ? "🔗 Direct Visit"
                          : ref.referrer || "🔗 Unknown"}
                      </span>
                      <span className="text-purple-300">{ref.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Top Countries */}
            {analytics.topCountriesArray?.length > 0 && (
              <div className="mt-6 bg-white/5 p-4 backdrop-blur-md border border-white/10 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-center mb-2">
                  🗺️ Top Countries
                </h3>

                <ul className="text-sm space-y-2">
                  {analytics.topCountriesArray.map((c, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b border-white/10 pb-1"
                    >
                      <span>
                        {c.country === "Unknown"
                          ? "🌍 Unknown"
                          : c.country}
                      </span>
                      <span className="text-purple-300">{c.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsModal;
