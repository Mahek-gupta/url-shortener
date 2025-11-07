import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0f0f1a] text-gray-400 py-12 overflow-hidden border-t border-white/10 backdrop-blur-md">
      {/* Glow background effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-pink-500/5 to-transparent blur-3xl"></div>

      <div className="relative container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Shortly
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            &copy; {new Date().getFullYear()} Shortly — All rights reserved.
          </p>
        </motion.div>

        {/* Center Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 text-sm font-medium"
        >
          <a href="#" className="transition hover:text-white hover:scale-105">
            Terms
          </a>
          <a href="#" className="transition hover:text-white hover:scale-105">
            Privacy Policy
          </a>
          <a href="#" className="transition hover:text-white hover:scale-105">
            Contact
          </a>
          <a
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white hover:scale-105"
          >
            GitHub
          </a>
        </motion.div>

        {/* Right Social Icons */}
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

      {/* Bottom subtle glow line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-pink-500 via-white to-purple-500 origin-left"
      ></motion.div>
    </footer>
  );
};

export default Footer;
