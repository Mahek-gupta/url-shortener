import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section id="docs"
      className="
        relative py-24 
        bg-gray-100 text-gray-900 
        dark:bg-[#0f0f1a] dark:text-white 
        overflow-hidden
      "
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 blur-3xl"></div>

      {/* Floating particles animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="
              absolute w-[2px] h-[2px] 
              bg-black/30 dark:bg-white/30 
              rounded-full
            "
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            text-4xl md:text-5xl font-extrabold mb-6 leading-snug 
            bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 
            bg-clip-text text-transparent
          "
        >
          Start Shortening Your URLs Today — It’s Free!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Create short, trackable, and powerful links to boost your brand visibility.
          Join thousands of professionals already using our service!
        </motion.p>

        {/* CTA Button */}
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 25px rgba(168,85,247,0.6)",
          }}
          whileTap={{ scale: 0.96 }}
          className="
            relative px-10 py-4 rounded-full text-lg font-bold 
            text-white 
            bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 
            hover:from-pink-600 hover:to-purple-600
            shadow-[0_0_20px_rgba(168,85,247,0.3)] 
            transition-all duration-300
            backdrop-blur-md 
            border border-white/20
          "
        >
          <span className="relative z-10">🚀 Get Started</span>
          <div className="absolute inset-0 rounded-full bg-white/10 blur-lg"></div>
        </motion.button>

        {/* Glow Line Animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mx-auto mt-10 w-48 h-[2px] bg-gradient-to-r from-pink-500 via-yellow to-purple-500 origin-left"
        ></motion.div>
      </div>
    </section>
  );
};

export default CTA;
