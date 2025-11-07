// import React from 'react';

// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-dark-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//     <div className="text-primary-purple text-4xl mb-4">{icon}</div> {/* Placeholder icon */}
//     <h3 className="text-xl font-semibold mb-2 text-light-text">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// const Features = () => {
//   const featuresData = [
//     {
//       icon: '⚡', // Replaced with Lucide icon: <LightningBoltIcon className="h-8 w-8" />
//       title: 'Fast Shortening',
//       description: 'Instantly generate short URLs using secure APIs.',
//     },
//     {
//       icon: '📊', // Replaced with Lucide icon: <ChartBarIcon className="h-8 w-8" />
//       title: 'Click Analytics',
//       description: 'Track link clicks and performance metrics in real-time.',
//     },
//     {
//       icon: '🔒', // Replaced with Lucide icon: <LockClosedIcon className="h-8 w-8" />
//       title: 'Secure Links',
//       description: 'Encrypted and reliable link redirection for all your needs.',
//     },
//     {
//       icon: '📱', // Replaced with Lucide icon: <DeviceMobileIcon className="h-8 w-8" />
//       title: 'Responsive Design',
//       description: 'Works perfectly on any device, from desktop to mobile.',
//     },
//   ];

//   return (
//     <section className="py-16 bg-dark-bg text-center">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-extrabold mb-10 gradient-text">
//           Why Choose Shortly?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {featuresData.map((feature, index) => (
//             <FeatureCard key={index} {...feature} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;



// import React from 'react';
// import { motion } from 'framer-motion';
// // Import specific icons from lucide-react
// import { Zap, BarChart2, Lock } from 'lucide-react';

// // Define Framer Motion variants for staggered animation
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2, // Delay between each child's animation
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: 'spring',
//       stiffness: 100,
//       damping: 10,
//     },
//   },
// };

// const FeatureCard = ({ icon: Icon, title, description }) => (
//   <motion.div
//     variants={itemVariants}
//     className="relative p-6 bg-dark-card rounded-xl shadow-lg border border-gray-700
//                backdrop-filter backdrop-blur-lg bg-opacity-70 overflow-hidden
//                flex flex-col items-center text-center
//                hover:border-primary-purple hover:shadow-primary-purple-md transition-all duration-300"
//   >
//     {/* Animated border/light effect - similar to image */}
//     <div className="absolute inset-0 border border-transparent rounded-xl pointer-events-none
//                     before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-primary-purple before:opacity-0 before:transition-opacity before:duration-300
//                     hover:before:opacity-100" />
//     <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />


//     <div className="text-primary-purple border-white text-4xl mb-4 p-3 bg-gray-800 rounded-full flex items-center justify-center">
//       <Icon size={32}/> {/* Using the Lucide icon component */}
//     </div>
//     <h3 className="text-xl font-semibold mb-2 text-light-text">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </motion.div>
// );

// const Features = () => {
//   const featuresData = [
//     {
//       icon: Zap, // Lucide icon component
//       title: 'Fast Shortening',
//       description: 'Instantly generate short URLs using secure APIs.',
//     },
//     {
//       icon: BarChart2, // Lucide icon component
//       title: 'Click Analytics',
//       description: 'Track link clicks and performance metrics.',
//     },
//     {
//       icon: Lock, // Lucide icon component
//       title: 'Secure Links',
//       description: 'Encrypted and reliable link redirection.',
//     },
//     // The image only shows 3, but I'll keep the responsive design for completeness
//     // {
//     //   icon: Monitor, // Example: <Monitor /> for responsive design
//     //   title: 'Responsive Design',
//     //   description: 'Works perfectly on any device.',
//     // },
//   ];

//   return (
//     <section className="py-16 bg-dark-bg text-center overflow-hidden">
//       <div className="container mx-auto px-4 max-w-7xl">
//         <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-light-text text-left pl-2 md:pl-0">
//           Features
//         </h2>
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible" // Animate when component comes into view
//           viewport={{ once: true, amount: 0.3 }} // Only animate once
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
//         >
//           {featuresData.map((feature, index) => (
//             <FeatureCard key={index} {...feature} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Features;



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
    <section className="py-20 bg-[#0f0f1a] text-center overflow-hidden">
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

