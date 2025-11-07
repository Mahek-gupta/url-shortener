import React from "react";
import { motion } from "framer-motion";
import { Link, Scissors, Share2 } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Link,
    title: "Paste Your Link",
    description: "Add your long URL to shorten it instantly.",
  },
  {
    number: "2",
    icon: Scissors,
    title: "Click Shorten",
    description: "Smartly generate a trackable short link.",
  },
  {
    number: "3",
    icon: Share2,
    title: "Share & Track",
    description: "Monitor link clicks and performance metrics.",
  },
];

// Framer motion animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
};

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-[#0f0f1a] overflow-hidden text-white">
      {/* --- Background glow --- */}
      <div className="absolute inset-0  blur-3xl"></div>

      {/* --- Floating particles --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* --- Section content --- */}
      <div className="relative container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl font-extrabold mb-20"
        >
          How It Works 🚀
        </motion.h2>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-16 relative"
        >
          {/* Connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden md:block absolute top-1/2 left-24 right-24 border-t border-dashed border-purple-400/50 transform -translate-y-1/2 origin-left"
          ></motion.div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 25px rgba(168,85,247,0.3)",
              }}
              className="relative flex flex-col items-center text-center p-8 w-72 rounded-2xl
              bg-gradient-to-br from-[#1a1a2e]/70 to-[#11111f]/70 backdrop-blur-2xl
              border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]
              transition-all duration-300 hover:border-purple-500/50"
            >
              {/* Animated glow border */}
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent blur-lg"
              ></motion.div>

              {/* Step number circle */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="w-14 h-14 mb-4 rounded-full flex items-center justify-center
                bg-gradient-to-br from-purple-500/50 to-pink-500/40
                border border-white/20 shadow-inner backdrop-blur-md"
              >
                <span className="text-xl font-bold text-white/90">
                  {step.number}
                </span>
              </motion.div>

              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="relative mb-5"
              >
                <div className="absolute inset-0 blur-md bg-purple-500/40 rounded-full"></div>
                <div className="relative bg-[#181828] rounded-full p-4 border border-white/10">
                  <step.icon className="text-purple-400 w-8 h-8" />
                </div>
              </motion.div>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Animated connecting arrow */}
              {i < steps.length - 1 && (
                <motion.svg
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.3 }}
                  className="hidden md:block absolute right-[-55px] top-1/2 transform -translate-y-1/2 w-12 h-12 animate-bounce-x"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <path d="M5 12h14m0 0l-4-4m4 4l-4 4" />
                </motion.svg>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
