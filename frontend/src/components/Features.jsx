import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart2, Lock } from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

// Feature Card
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className="
      relative p-8 rounded-2xl bg-gradient-to-br from-[#1a1a2e]/90 to-[#11111f]/80
      backdrop-blur-xl border border-gray-700/60 shadow-xl transition-all duration-300
      overflow-hidden group
    "
  >
    {/* ✨ White light glow edges */}
    <div className="absolute inset-0 rounded-2xl pointer-events-none">
      <div className="absolute top-0  inset-x-0 h-px bg-gradient-to-r from-transparent via-white/100 to-transparent opacity-100"></div>
      <div className="absolute bottom-0  inset-x-0 h-px bg-gradient-to-r from-transparent via-white/100 to-transparent opacity-100"></div>
      <div className="absolute left-0  inset-y-0 w-px bg-gradient-to-b from-transparent via-white/100 to-transparent opacity-100"></div>
      <div className="absolute right-0  inset-y-0 w-px bg-gradient-to-b from-transparent via-white/100 to-transparent opacity-100"></div>
    </div>

    {/* Icon with gradient ring */}
    <div className="mb-5 flex justify-center">
      <div className="relative w-16 h-16 rounded-full flex items-center justify-center 
        before:absolute before:inset-0 before:rounded-full before:p-[2px]
        before:bg-gradient-to-tr before:from-purple-500 before:to-pink-500 before:content-['']">
        <div className="relative z-10 w-full h-full rounded-full bg-[#1e1e2f] flex items-center justify-center">
          <Icon size={30} className="text-purple-400" />
        </div>
      </div>
    </div>

    {/* Text */}
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

// Features Section
const Features = () => {
  const featuresData = [
    {
      icon: Zap,
      title: "Fast Shortening",
      description: "Instantly generate short URLs using secure APIs.",
    },
    {
      icon: BarChart2,
      title: "Click Analytics",
      description: "Track link clicks and performance metrics.",
    },
    {
      icon: Lock,
      title: "Secure Links",
      description: "Encrypted and reliable link redirection.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#0f0f1a] text-center overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-14 text-white text-left">
          Features
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
        >
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

