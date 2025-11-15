import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPages = () => {
  const { shortCode } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/analytics/${shortCode}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setAnalytics(data);
      } catch (err) {
        toast.error(err.message || "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [shortCode]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-400">Loading...</div>;
  if (!analytics) return <div className="text-center mt-20 text-gray-400">No analytics data found.</div>;

  return (
    <div className="container mx-auto px-6 py-10 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">
          Analytics for: <span className="text-white">{shortCode}</span>
        </h1>
        <Link
          to="/dashboard"
          className="text-sm text-gray-300 hover:text-purple-400 border border-gray-600 px-3 py-1 rounded-md"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* URL Info */}
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl mb-8">
        <p className="text-gray-400 mb-3">
          <span className="font-semibold text-gray-200">Original URL:</span>{" "}
          <a href={analytics.longUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
            {analytics.longUrl}
          </a>
        </p>
        <p className="text-gray-400 mb-2">
          <span className="font-semibold text-gray-200">Short URL:</span>{" "}
          <a href={analytics.shortUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
            {analytics.shortUrl}
          </a>
        </p>
        {analytics.expiresAt && (
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Expires At:</span>{" "}
            <span className="text-red-400">
              {new Date(analytics.expiresAt).toLocaleDateString()}
            </span>
          </p>
        )}
        <p className="text-gray-400">
          <span className="font-semibold text-gray-200">Created:</span>{" "}
          {new Date(analytics.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Daily Clicks Chart */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-purple-400">📊 Daily Clicks</h3>
        {analytics.dailyClicks && Object.keys(analytics.dailyClicks).length > 0 ? (
          <div className="w-full min-h-[300px]">
            <ResponsiveContainer width="100%" aspect={2}>
              <LineChart
                data={Object.entries(analytics.dailyClicks).map(([date, count]) => ({
                  date,
                  count: Number(count),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No click data available.</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPages;
