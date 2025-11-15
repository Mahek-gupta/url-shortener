
import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-white/70 dark:bg-[#0f0f1a] dark:text-gray-400 py-16 overflow-hidden border-t border-white/10 dark:border-white/5 backdrop-blur-lg">

      {/* ====================================================== */}
      {/* 🔵 FLOATING GLASSMORPHIC CIRCLE (LEFT) */}
      {/* ====================================================== */}
      <motion.div
        initial={{ x: -120, y: 50, opacity: 0.4 }}
        animate={{
          x: [-120, -60, -120],
          y: [50, 10, 50],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-1/3 w-60 h-60 rounded-full blur-3xl
        bg-gradient-to-br from-orange-500/40 via-red-400/30 to-purple-500/30
        dark:from-orange-400/20 dark:via-pink-500/10 dark:to-purple-700/20"
      ></motion.div>

      {/* ====================================================== */}
      {/* 🟪 FLOATING BLUR GRADIENT RECTANGLE (RIGHT) */}
      {/* ====================================================== */}
      <motion.div
        initial={{ x: 150, y: 200, opacity: 0.3 }}
        animate={{
          x: [150, 180, 150],
          y: [200, 150, 200],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 bottom-10 w-40 h-56 rounded-2xl blur-2xl 
        bg-gradient-to-tr from-purple-500/40 via-blue-400/30 to-pink-400/30
        dark:from-purple-700/20 dark:via-blue-500/10 dark:to-pink-700/20"
      ></motion.div>

      {/* ====================================================== */}
      {/* ✨ FLOATING SMALL PARTICLES */}
      {/* ====================================================== */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[4px] h-[4px] rounded-full bg-purple-400/40 dark:bg-white/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * 300,
            opacity: 0.4,
          }}
          animate={{
            y: [null, Math.random() * 300 + 100],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
        />
      ))}

      {/* ====================================================== */}
      {/* MAIN FOOTER CONTENT */}
      {/* ====================================================== */}
      <div className="relative container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
  
        {/* LEFT – LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        
          <h3 className=" flex gap-3 text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
             <Logo/>
            Shortly
          </h3>
          <p className="text-sm opacity-80 mt-1">
            © {new Date().getFullYear()} Shortly — All rights reserved.
          </p>
        </motion.div>

        {/* CENTER – LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 text-sm font-medium"
        >
          {["Terms", "Privacy Policy", "Contact"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="transition hover:text-purple-500 dark:hover:text-white hover:scale-110"
            >
              {item}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            className="transition hover:text-purple-500 dark:hover:text-white hover:scale-110"
          >
            GitHub
          </a>
        </motion.div>

        {/* RIGHT – SOCIAL ICONS */}
         <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end space-x-5"
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
          >
            <Github size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
          >
            <Twitter size={20} />
          </a>
        </motion.div>
      </div>

      {/* ====================================================== */}
      {/* GLOW LINE */}
      {/* ====================================================== */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.3, delay: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-white to-purple-500 dark:via-gray-300 origin-left"
      ></motion.div>
    </footer>
  );
};

export default Footer;

