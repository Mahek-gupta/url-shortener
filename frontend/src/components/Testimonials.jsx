// import React from 'react';

// const TestimonialCard = ({ quote, author, title }) => (
//   <div className="bg-dark-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
//     <p className="italic text-lg mb-4 text-gray-300">"{quote}"</p>
//     <img
//       src="https://via.placeholder.com/60" // Placeholder for avatar
//       alt={author}
//       className="w-16 h-16 rounded-full object-cover mb-2"
//     />
//     <p className="font-semibold text-light-text">{author}</p>
//     <p className="text-sm text-primary-purple">{title}</p>
//   </div>
// );

// const Testimonials = () => {
//   const testimonialsData = [
//     {
//       quote: "This shortener helped us manage all our campaign links easily and track their performance effectively.",
//       author: "Riya S.",
//       title: "Digital Marketer",
//     },
//     {
//       quote: "An indispensable tool for our social media strategy. The analytics are clear and actionable!",
//       author: "John D.",
//       title: "Social Media Manager",
//     },
//     {
//       quote: "Simple, fast, and reliable. Exactly what we needed for our marketing efforts.",
//       author: "Sarah L.",
//       title: "Content Creator",
//     },
//   ];

//   return (
//     <section className="py-16 bg-gradient-to-br from-gray-900 to-dark-bg text-center">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-extrabold mb-10 gradient-text">
//           What Our Users Say
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonialsData.map((testimonial, index) => (
//             <TestimonialCard key={index} {...testimonial} />
//           ))}
//         </div>
//         <div className="mt-12 text-lg text-light-text font-semibold">
//           <p>Trusted by 100+ businesses worldwide</p>
//           <div className="flex justify-center items-center space-x-6 mt-4 opacity-75">
//             {/* Placeholder logos */}
//             <img src="https://via.placeholder.com/80x30/333/fff?text=CompanyA" alt="Company A" className="h-6" />
//             <img src="https://via.placeholder.com/80x30/333/fff?text=CompanyB" alt="Company B" className="h-6" />
//             <img src="https://via.placeholder.com/80x30/333/fff?text=CompanyC" alt="Company C" className="h-6" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;














// import React from "react";
// import { motion } from "framer-motion";

// // --- Animation variants ---
// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const hoverGlow = {
//   scale: 1.05,
//   boxShadow: "0 0 25px rgba(255,255,255,0.25)",
//   transition: { type: "spring", stiffness: 200, damping: 12 },
// };

// // --- Testimonial Card Component ---
// const TestimonialCard = ({ quote, author, title, img }) => (
//   <motion.div
//     variants={fadeInUp}
//     whileHover={hoverGlow}
//     className="relative bg-gradient-to-br from-[#1a1a2e]/70 to-[#0f0f1a]/70
//     border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg 
//     transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
//   >
//     {/* --- Glow effect border --- */}
//     <motion.div
//       animate={{ opacity: [0.2, 0.8, 0.2] }}
//       transition={{ repeat: Infinity, duration: 3 }}
//       className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 rounded-2xl blur-xl"
//     ></motion.div>

//     <p className="italic text-gray-300 text-lg mb-6 relative z-10">“{quote}”</p>

//     <motion.img
//       src={img}
//       alt={author}
//       whileHover={{ rotate: [0, 5, -5, 0] }}
//       transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//       className="w-16 h-16 rounded-full object-cover border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)] mb-3 relative z-10"
//     />

//     <h3 className="font-semibold text-white text-lg relative z-10">{author}</h3>
//     <p className="text-sm text-purple-400 relative z-10">{title}</p>
//   </motion.div>
// );

// const Testimonials = () => {
//   const testimonialsData = [
//     {
//       quote:
//         "This shortener helped us manage all our campaign links easily and track their performance effectively.",
//       author: "Riya S.",
//       title: "Digital Marketer",
//       img: "https://via.placeholder.com/60",
//     },
//     {
//       quote:
//         "An indispensable tool for our social media strategy. The analytics are clear and actionable!",
//       author: "John D.",
//       title: "Social Media Manager",
//       img: "https://via.placeholder.com/60",
//     },
//     {
//       quote:
//         "Simple, fast, and reliable. Exactly what we needed for our marketing efforts.",
//       author: "Sarah L.",
//       title: "Content Creator",
//       img: "https://via.placeholder.com/60",
//     },
//   ];

//   return (
//     <section className="relative py-24 bg-[#0f0f1a] text-white overflow-hidden">
//       {/* --- Soft background glow --- */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10 blur-3xl"></div>

//       {/* --- Floating light particles --- */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
//             initial={{
//               x: Math.random() * window.innerWidth,
//               y: Math.random() * window.innerHeight,
//               opacity: 0.2,
//             }}
//             animate={{
//               y: [null, Math.random() * window.innerHeight],
//               opacity: [0.2, 0.8, 0.2],
//             }}
//             transition={{
//               duration: 6 + Math.random() * 6,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* --- Section Content --- */}
//       <div className="relative container mx-auto px-6 max-w-6xl">
//         <motion.h2
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true }}
//           className="text-4xl font-extrabold text-center mb-12"
//         >
//           What Our Users Say 💬
//         </motion.h2>

//         {/* --- Testimonial Cards --- */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           variants={{
//             visible: {
//               transition: { staggerChildren: 0.2, delayChildren: 0.2 },
//             },
//           }}
//           viewport={{ once: true, amount: 0.3 }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-10"
//         >
//           {testimonialsData.map((t, i) => (
//             <TestimonialCard key={i} {...t} />
//           ))}
//         </motion.div>

//         {/* --- Trusted By Section --- */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.7 }}
//           className="mt-16 text-center relative z-10"
//         >
//           <p className="text-lg text-gray-300 mb-6 font-semibold">
//             Trusted by <span className="text-white">100+ businesses</span> worldwide
//           </p>
//           <div className="flex justify-center items-center space-x-8 opacity-70">
//             <img
//               src="https://via.placeholder.com/80x30/333/fff?text=CompanyA"
//               alt="Company A"
//               className="h-6"
//             />
//             <img
//               src="https://via.placeholder.com/80x30/333/fff?text=CompanyB"
//               alt="Company B"
//               className="h-6"
//             />
//             <img
//               src="https://via.placeholder.com/80x30/333/fff?text=CompanyC"
//               alt="Company C"
//               className="h-6"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;






import React from "react";
import { motion } from "framer-motion";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const hoverGlow = {
  scale: 1.05,
  boxShadow: "0 0 25px rgba(255,255,255,0.25)",
  transition: { type: "spring", stiffness: 200, damping: 12 },
};

// --- Testimonial Card ---
const TestimonialCard = ({ quote, author, title, img }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={hoverGlow}
    className="relative bg-gradient-to-br from-[#1a1a2e]/70 to-[#0f0f1a]/70
    border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg 
    transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
  >
    {/* Soft Glow Layer */}
    <motion.div
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 rounded-2xl blur-xl"
    ></motion.div>

    <p className="italic text-gray-300 text-lg mb-6 relative z-10">“{quote}”</p>

    <motion.img
      src={img}
      alt={author}
      whileHover={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.25)] mb-3 relative z-10"
    />

    <h3 className="font-semibold text-white text-lg relative z-10">{author}</h3>
    <p className="text-sm text-purple-400 relative z-10">{title}</p>
  </motion.div>
);

// --- Main Component ---
const Testimonials = () => {
  const testimonialsData = [
    {
      quote:
        "This shortener helped us manage all our campaign links easily and track their performance effectively.",
      author: "Riya Sharma",
      title: "Digital Marketer at BrightReach",
      img: "https://i.pravatar.cc/150?img=47",
    },
    {
      quote:
        "An indispensable tool for our social media strategy. The analytics are clear and actionable!",
      author: "John Davis",
      title: "Social Media Manager at VibeWave",
      img: "https://i.pravatar.cc/150?img=15",
    },
    {
      quote:
        "Simple, fast, and reliable. Exactly what we needed for our marketing efforts.",
      author: "Sarah Lee",
      title: "Content Creator at Creatify",
      img: "https://i.pravatar.cc/150?img=32",
    },
  ];

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  ];

  return (
    <section className="relative py-24 bg-[#0f0f1a] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0  blur-3xl"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
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
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Section Content */}
      <div className="relative container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center mb-12"
        >
          What Our Users Say 💬
        </motion.h2>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {testimonialsData.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-16 text-center relative z-10"
        >
          <p className="text-lg text-gray-300 mb-6 font-semibold">
            Trusted by <span className="text-white">100+ brands</span> worldwide 🌍
          </p>

          {/* Logo Carousel */}
          <div className="overflow-hidden relative w-full">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex justify-center items-center space-x-14 w-[200%]"
            >
              {[...logos, ...logos].map((logo, index) => (
                <motion.img
                  key={index}
                  src={logo}
                  alt="Company Logo"
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="h-8 opacity-80 hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                />
              ))}
            </motion.div>

            {/* Gradient Edge Fades */}
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0f0f1a] to-transparent"></div>
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0f0f1a] to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;



