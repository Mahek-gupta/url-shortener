import React from "react";
import { motion } from "framer-motion";
import ShortenForm from "./ShortenForm";
import ParticlesBackground from "./ParticlesBackground";

const Hero = () => {
  return (
    <section
      className="
        relative bg-hero-pattern bg-cover bg-center 
        min-h-[90vh] flex flex-col justify-center items-center 
        text-center px-6 py-5 overflow-hidden
        transition-all duration-500
      "
    >
      {/* 🌈 Background Overlay (changes with theme) */}
      <div
        className="
          absolute inset-0 
          bg-white/70 dark:bg-black/60
          backdrop-blur-lg
          z-0
          transition-all duration-500
        "
      ></div>

      {/* ✨ Animated particles (behind text) */}
      <ParticlesBackground />

      {/* 📝 Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl z-10"
      >
        <motion.h1
          className="
            text-4xl md:text-6xl font-extrabold leading-snug
            text-dark-text dark:text-dark-text
            transition-all duration-500
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Shorten, Share & Track <br />
          <span className="text-primary-purple">
            Your Links Instantly 🚀
          </span>
        </motion.h1>

        <motion.p
          className="
            mt-5 text-lg 
            text-gray-700 dark:text-gray-300
            transition-all duration-500
          "
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Turn long URLs into smart, shareable links with real-time analytics.
        </motion.p>
      </motion.div>

      {/* 🔗 Shorten Form */}
      <motion.div
        className="mt-10 w-full max-w-xl z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <ShortenForm />
      </motion.div>
    </section>
  );
};

export default Hero;
