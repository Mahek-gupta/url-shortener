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
