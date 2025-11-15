import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { name: "Mon", clicks: 20 },
  { name: "Tue", clicks: 45 },
  { name: "Wed", clicks: 60 },
  { name: "Thu", clicks: 40 },
  { name: "Fri", clicks: 75 },
  { name: "Sat", clicks: 90 },
  { name: "Sun", clicks: 120 },
];

const pieData = [
  { name: "Germany", value: 40 },
  { name: "India", value: 35 },
  { name: "Brazil", value: 25 },
];

const COLORS = ["#6366f1", "#a855f7", "#ec4899"];

// Framer Motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardHover = {
  scale: 1.05,
  boxShadow: "0 0 25px rgba(168,85,247,0.3)",
  transition: { type: "spring", stiffness: 200, damping: 12 },
};

const AnalyticsPreview = () => {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden text-gray-900 dark:text-white bg-white/80 dark:bg-[#0f0f1a] transition-colors duration-500">
      {/* Background glow */}
      <div className="absolute inset-0 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-center mb-3"
        >
          Analytics Preview 📊
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-center text-gray-600 dark:text-gray-400 mb-14"
        >
          See who’s clicking your links and from where.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* --- Card 1: Line Chart --- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            whileHover={cardHover}
            viewport={{ once: true }}
            className="relative rounded-2xl p-6 backdrop-blur-xl shadow-lg border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-[#1a1a2e] dark:to-[#11111f] transition-all duration-300"
          >
            <motion.h3
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Clicks Per Day
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-48"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip
                    contentStyle={{
                      background: "#1f1f2e",
                      border: "none",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{ fill: "#a855f7" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* --- Card 2: Pricing Info --- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            whileHover={cardHover}
            viewport={{ once: true }}
            className="relative flex flex-col justify-center items-center text-center rounded-2xl p-6 backdrop-blur-xl shadow-lg border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-[#1a1a2e]/100 dark:to-[#11111f]/100 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-3">Shorten unlimited links</h3>
            <motion.p
              className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              Free
            </motion.p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Custom short URLs
            </p>
            <motion.p
              className="text-xl mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ₹199/mo
            </motion.p>
          </motion.div>

          {/* --- Card 3: Pie Chart --- */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            whileHover={cardHover}
            viewport={{ once: true }}
            className="relative rounded-2xl p-6 backdrop-blur-xl shadow-lg border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-gradient-to-br dark:from-[#1a1a2e] dark:to-[#11111f] text-center transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
            <div className="flex justify-center items-center h-48">
              <ResponsiveContainer width="80%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Business <br />
              API access + analytics <br />
              <span className="text-gray-900 dark:text-white font-semibold">
                ₹499/mo
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPreview;

