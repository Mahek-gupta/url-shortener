import React from "react";
import { motion } from "framer-motion";
import ShortenForm from "./ShortenForm";
import ParticlesBackground from "./ParticlesBackground";

const Hero = () => {
  return (
    <section className="  relative bg-hero-pattern bg-cover opacity-.1 bg-center min-h-[90vh] flex flex-col justify-center items-center text-center text-gray-100 px-6 overflow-hidden">
      {/* ✨ Animated particles behind everything */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>
      <ParticlesBackground />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl z-10"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Shorten, Share & Track <br />
          <span className="text-purple-400">Your Links Instantly 🚀</span>
        </motion.h1>

        <motion.p
          className="mt-5 text-gray-400 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Turn long URLs into smart, shareable links with real-time analytics.
        </motion.p>
      </motion.div>

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
