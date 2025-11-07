// import React from 'react';

// const AnalyticsPreview = () => {
//   return (
//     <section className="py-16 bg-dark-bg text-center">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-extrabold mb-10 gradient-text">
//           See who's clicking your links and from where.
//         </h2>
//         <div className="flex flex-col lg:flex-row items-center justify-center gap-12 bg-dark-card p-8 rounded-lg shadow-xl">
//           {/* Mockup Graph */}
//           <div className="w-full lg:w-1/2 p-4 bg-gray-800 rounded-md">
//             <h3 className="text-xl font-semibold mb-4 text-light-text">Clicks Per Day</h3>
//             {/* Simple SVG graph placeholder */}
//             <svg viewBox="0 0 300 150" className="w-full" style={{ 'stroke': '#8B5CF6', 'fill': 'none', 'strokeWidth': '2' }}>
//               <polyline points="0,100 50,70 100,80 150,50 200,60 250,30 300,40" />
//               {/* X-axis labels */}
//               <text x="0" y="140" fill="#9CA3AF" fontSize="10">Day 1</text>
//               <text x="75" y="140" fill="#9CA3AF" fontSize="10">Day 2</text>
//               <text x="150" y="140" fill="#9CA3AF" fontSize="10">Day 3</text>
//               <text x="225" y="140" fill="#9CA3AF" fontSize="10">Day 4</text>
//               <text x="290" y="140" fill="#9CA3AF" fontSize="10">Day 5</text>
//             </svg>
//           </div>

//           {/* Pricing/Plans Mockup - integrated for demo purposes */}
//           <div className="w-full lg:w-1/2 p-4 flex flex-col items-center justify-center gap-6">
//             <h3 className="text-xl font-semibold mb-4 text-light-text">Our Plans</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
//               <div className="bg-gray-800 p-4 rounded-md text-center border border-primary-purple">
//                 <h4 className="font-bold text-lg text-primary-purple">Free</h4>
//                 <p className="text-sm text-gray-400">Shorten unlimited links</p>
//                 <p className="text-2xl font-bold mt-2">₹0</p>
//               </div>
//               <div className="bg-gray-800 p-4 rounded-md text-center">
//                 <h4 className="font-bold text-lg">Pro</h4>
//                 <p className="text-sm text-gray-400">Custom URLs + Analytics</p>
//                 <p className="text-2xl font-bold mt-2">₹199/mo</p>
//               </div>
//               <div className="bg-gray-800 p-4 rounded-md text-center">
//                 <h4 className="font-bold text-lg">Business</h4>
//                 <p className="text-sm text-gray-400">API access + branded domains</p>
//                 <p className="text-2xl font-bold mt-2">₹499/mo</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AnalyticsPreview;










import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
    <section className="relative bg-[#0f0f1a] py-24 overflow-hidden text-white">
      {/* Background gradient glow */}
      <div className="absolute inset-0  blur-3xl"></div>

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
          className="text-center text-gray-400 mb-14"
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
            className="relative bg-gradient-to-br from-[#1a1a2e]/70 to-[#11111f]/70
              border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg"
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
            className="relative flex flex-col justify-center items-center text-center
              bg-gradient-to-br from-[#1a1a2e]/70 to-[#11111f]/70
              border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-3">Shorten unlimited links</h3>
            <motion.p
              className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              Free
            </motion.p>
            <p className="text-gray-400 text-sm">Custom short URLs</p>
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
            className="relative bg-gradient-to-br from-[#1a1a2e]/70 to-[#11111f]/70
              border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg text-center"
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
            <p className="text-gray-400 text-sm mt-2">
              Business <br />
              API access + analytics <br />
              <span className="text-white font-semibold">₹499/mo</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPreview;
