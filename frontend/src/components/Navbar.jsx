// import React, { useState } from 'react';
// // import img from '../assets/image1.jpg'
// import Logo from './Logo.jsx';

// const Navbar = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true); // Example for dark/light toggle

//   return (
//     <nav className="p-4 flex justify-between items-center text-dark-text bg-dark-bg">
//       <div className="flex items-center">
//         {/* <img src={img} alt="Shortly Logo" className="h-8 mr-2" /> Placeholder */}
//         <Logo size={32} />
//         <span className="text-xl font-bold">Shortly</span>
//       </div>
//       <div className="hidden md:flex space-x-6">
//         <a href="#" className="hover:text-primary-purple">Home</a>
//         <a href="#" className="hover:text-primary-purple">Features</a>
//         <a href="#" className="hover:text-primary-purple">Pricing</a>
//         <a href="#" className="hover:text-primary-purple">Docs</a>
//         <a href="#" className="hover:text-primary-purple">Contact</a>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button className="bg-primary-purple px-4 py-2 rounded-md hover:opacity-90">
//           Sign In / Get Started
//         </button>
//         {/* Dark/Light Mode Toggle */}
//         <button
//           onClick={() => setIsDarkMode(!isDarkMode)}
//           className="p-2 rounded-full bg-dark-card text-dark-text"
//         >
//           {isDarkMode ? '🌙' : '☀️'}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// import React, { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import Logo from './Logo.jsx';

// const Navbar = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Apply saved theme on load
//   useEffect(() => {
//     const theme = localStorage.getItem('theme');
//     if (theme === 'light') {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove('dark');
//     } else {
//       setIsDarkMode(true);
//       document.documentElement.classList.add('dark');
//     }
//   }, []);

//   // Toggle light/dark mode
//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     if (isDarkMode) {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     } else {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     }
//   };

//   // Toggle mobile menu
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <nav className="bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text shadow-md fixed w-full z-50">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <Logo size={32} />
//           <span className="text-xl font-bold">Shortly</span>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="hover:text-primary-purple transition">Home</a>
//           <a href="#" className="hover:text-primary-purple transition">Features</a>
//           <a href="#" className="hover:text-primary-purple transition">Pricing</a>
//           <a href="#" className="hover:text-primary-purple transition">Docs</a>
//           <a href="#" className="hover:text-primary-purple transition">Contact</a>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center space-x-4">
//           <button className="hidden md:inline bg-primary-purple text-white font-medium px-4 py-2 rounded-lg hover:bg-primary-purple/90 transition">
//             Sign In / Get Started
//           </button>

//           {/* Dark/Light Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-gray-200 dark:bg-dark-card"
//             title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//           >
//             {isDarkMode ? '🌙' : '☀️'}
//           </button>

//           {/* Mobile Menu Button */}
//           <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-dark-card">
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white dark:bg-dark-card text-center flex flex-col space-y-4 py-4 shadow-md transition-all">
//           <a href="#" className="hover:text-primary-purple">Home</a>
//           <a href="#" className="hover:text-primary-purple">Features</a>
//           <a href="#" className="hover:text-primary-purple">Pricing</a>
//           <a href="#" className="hover:text-primary-purple">Docs</a>
//           <a href="#" className="hover:text-primary-purple">Contact</a>
//           <button className="bg-primary-purple text-white font-medium px-4 py-2 rounded-lg hover:bg-primary-purple/90 transition">
//             Sign In / Get Started
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;










// // client/src/components/Navbar.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth }  from '../context/AuthContext'; // Import useAuth hook
// import Logo from './Logo.jsx';

// const Navbar = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true); // Example for dark/light toggle
//   const { isAuthenticated, user, logout } = useAuth(); // Get auth state and logout function
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <nav className="p-4 flex justify-between items-center text-dark-text bg-dark-bg border-b border-gray-700">
//       <div className="flex items-center">
//      <Logo/>
          
//           <span className="text-xl font-bold">Shortly</span>
      
//       </div>
//       <div className="hidden md:flex space-x-6">
//         <Link to="/" className="hover:text-primary-purple">Home</Link>
//         <a href="#features" className="hover:text-primary-purple">Features</a> {/* Anchor links */}
//         <a href="#pricing" className="hover:text-primary-purple">Pricing</a>
//         <a href="#docs" className="hover:text-primary-purple">Docs</a>
//         <a href="#contact" className="hover:text-primary-purple">Contact</a>
//         {isAuthenticated && (
//           <Link to="/dashboard" className="hover:text-primary-purple">Dashboard</Link>
//         )}
//       </div>
//       <div className="flex items-center space-x-4">
//         {!isAuthenticated ? (
//           <>
//             <Link to="/login" className="px-4 py-2 rounded-md hover:text-primary-purple">
//               Sign In
//             </Link>
//             <Link to="/register" className="bg-primary-purple px-4 py-2 rounded-md hover:opacity-90">
//               Get Started
//             </Link>
//           </>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 px-4 py-2 rounded-md hover:opacity-90"
//           >
//             Logout ({user?.username})
//           </button>
//         )}
//         {/* Dark/Light Mode Toggle */}
//         <button
//           onClick={() => setIsDarkMode(!isDarkMode)}
//           className="p-2 rounded-full bg-dark-card text-dark-text"
//         >
//           {isDarkMode ? '🌙' : '☀️'}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import Logo from "./Logo.jsx";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(
//     document.documentElement.classList.contains("dark")
//   );

//   const { isAuthenticated, user, logout } = useAuth();
//   const navigate = useNavigate();

//   // 🌀 Change navbar background on scroll
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // 🌗 Toggle dark mode
//   const toggleDarkMode = () => {
//     document.documentElement.classList.toggle("dark");
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300   ${
//         scrolled
//           ? " backdrop-blur-md shadow-md"
//           : "bg-dark-bg"
//       }`}
//     >
//       <div className="container px-2 py-2 flex justify-between items-center mx-auto">
//         {/* 🌐 Logo */}
//         <div className="flex items-center space-x-2">
//           <Logo />
//           <span className="text-2xl font-extrabold text-purple-500 dark:text-purple-400">
//             Shortly
//           </span>
//         </div>

//         {/* 🧭 Desktop Menu */}
//         <div className="hidden md:flex space-x-6 items-center text-gray-500 dark:text-gray-200">
//           <Link to="/" className="hover:text-purple-400">Home</Link>
//           <a href="#features" className="hover:text-purple-400">Features</a>
//           <a href="#pricing" className="hover:text-purple-400">Pricing</a>
//           <a href="#docs" className="hover:text-purple-400">Docs</a>
//           <a href="#contact" className="hover:text-purple-400">Contact</a>
//           {isAuthenticated && (
//             <Link to="/dashboard" className="hover:text-purple-400">
//               Dashboard
//             </Link>
//           )}
//         </div>

//         {/* ✨ Desktop Buttons */}
//         <div className="hidden md:flex items-center space-x-4">
//           {!isAuthenticated ? (
//             <>
//               <Link
//                 to="/login"
//                 className="px-4 py-2 rounded-md hover:text-purple-400"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
//               >
//                 Get Started
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-90"
//             >
//               Logout ({user?.username})
//             </button>
//           )}

//           {/* 🌗 Dark/Light Mode Toggle */}
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
//           >
//             {isDarkMode ? "🌙" : "☀️"}
//           </button>
//         </div>

//         {/* 🍔 Mobile Hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-gray-200 dark:text-gray-100 focus:outline-none"
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* 📱 Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-black/90 dark:bg-gray-900/95 backdrop-blur-md px-6 py-6 space-y-4 text-center text-gray-200 border-t border-gray-700">
//           <Link
//             to="/"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-400 transition"
//           >
//             Home
//           </Link>
//           <a
//             href="#features"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-400"
//           >
//             Features
//           </a>
//           <a
//             href="#pricing"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-400"
//           >
//             Pricing
//           </a>
//           <a
//             href="#docs"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-400"
//           >
//             Docs
//           </a>
//           <a
//             href="#contact"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-purple-400"
//           >
//             Contact
//           </a>

//           {isAuthenticated && (
//             <Link
//               to="/dashboard"
//               onClick={() => setMenuOpen(false)}
//               className="block hover:text-purple-400"
//             >
//               Dashboard
//             </Link>
//           )}

//           {!isAuthenticated ? (
//             <>
//               <Link
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//                 className="block bg-gray-700 px-4 py-2 rounded-md"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 onClick={() => setMenuOpen(false)}
//                 className="block bg-purple-500 px-4 py-2 rounded-md"
//               >
//                 Get Started
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setMenuOpen(false);
//               }}
//               className="block w-full bg-red-600 px-4 py-2 rounded-md hover:opacity-90"
//             >
//               Logout ({user?.username})
//             </button>
//           )}

//           {/* 🌙 Dark Mode Toggle */}
//           <button
//             onClick={toggleDarkMode}
//             className="mt-4 w-full py-2 rounded-md bg-gray-200 dark:bg-gray-700"
//           >
//             {isDarkMode ? "Switch to Light ☀️" : "Switch to Dark 🌙"}
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // 🌀 Detect scroll for background blur intensity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🌗 Toggle dark/light mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled
          ? "backdrop-blur-xl bg-white/60 dark:bg-gray-900/70 shadow-md"
          : "backdrop-blur-md bg-white/30 dark:bg-gray-900/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🌐 Logo */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-2xl font-extrabold text-purple-500 dark:text-purple-400">
            Shortly
          </span>
        </div>

        {/* 🧭 Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200">
          <Link to="/" className="hover:text-purple-500">Home</Link>
          <a href="#features" className="hover:text-purple-500">Features</a>
          <a href="#pricing" className="hover:text-purple-500">Pricing</a>
          <a href="#docs" className="hover:text-purple-500">Docs</a>
          <a href="#contact" className="hover:text-purple-500">Contact</a>
          {isAuthenticated && (
            <Link to="/dashboard" className="hover:text-purple-500">
              Dashboard
            </Link>
          )}
        </div>

        {/* ✨ Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md hover:text-purple-500"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-90"
            >
              Logout ({user?.username})
            </button>
          )}

          {/* 🌗 Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* 🍔 Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-gray-100 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/70 dark:bg-gray-900/95 backdrop-blur-lg px-6 py-6 space-y-4 text-center text-gray-800 dark:text-gray-200 border-t border-gray-700">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-purple-500">Home</Link>
          <a href="#features" onClick={() => setMenuOpen(false)} className="block hover:text-purple-500">Features</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="block hover:text-purple-500">Pricing</a>
          <a href="#docs" onClick={() => setMenuOpen(false)} className="block hover:text-purple-500">Docs</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="block hover:text-purple-500">Contact</a>
          {isAuthenticated && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block hover:text-purple-500">Dashboard</Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block bg-gray-700 text-white px-4 py-2 rounded-md">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block bg-purple-500 text-white px-4 py-2 rounded-md">
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-90"
            >
              Logout ({user?.username})
            </button>
          )}

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="mt-4 w-full py-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {isDarkMode ? "Switch to Light ☀️" : "Switch to Dark 🌙"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
