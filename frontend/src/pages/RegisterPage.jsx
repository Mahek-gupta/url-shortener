// client/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔴 Password mismatch 
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    // 🟡 Show loading toast
    const toastId = toast.loading("Creating your account...");

    const success = await register(username, email, password);

    if (success) {
      toast.success("Account created successfully!", { id: toastId });
      navigate('/login');
    } else {
      toast.error("Registration failed! Try again.", { id: toastId });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-300 dark:bg-dark-bg min-h-[calc(100vh-80px-80px)] py-12 px-4 md:pt-20 pt-16">

      {/* GLASSMORPHISM WRAPPER */}
      <div className="
        max-w-md w-full 
        bg-white/30 dark:bg-white/10 
        backdrop-blur-xl 
        border border-white/40 dark:border-white/20 
        shadow-xl rounded-xl p-8
      ">

        <h2 className="text-3xl font-extrabold text-light-text text-center mb-6 gradient-text">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-500">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                mt-1 block w-full px-4 py-2 
                bg-gray-800/40 dark:bg-gray-900/40 
                border border-gray-700 rounded-md shadow-sm 
                placeholder-gray-500 text-dark-text 
                focus:outline-none focus:ring-primary-purple focus:border-primary-purple
              "
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-500">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                mt-1 block w-full px-4 py-2 
                bg-gray-800/40 dark:bg-gray-900/40 
                border border-gray-700 rounded-md shadow-sm 
                placeholder-gray-500 text-dark-text 
                focus:outline-none focus:ring-primary-purple focus:border-primary-purple
              "
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-500">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                mt-1 block w-full px-4 py-2 
                bg-gray-800/40 dark:bg-gray-900/40
                border border-gray-700 rounded-md shadow-sm 
                placeholder-gray-500 text-dark-text 
                focus:outline-none focus:ring-primary-purple focus:border-primary-purple
              "
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                mt-1 block w-full px-4 py-2 
                bg-gray-800/40 dark:bg-gray-900/40
                border border-gray-700 rounded-md shadow-sm 
                placeholder-gray-500 text-dark-text 
                focus:outline-none focus:ring-primary-purple focus:border-primary-purple
              "
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex justify-center py-2 px-4 
              rounded-md shadow-sm text-lg font-medium text-white 
              bg-primary-purple hover:bg-purple-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple 
              disabled:opacity-50
            "
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-purple hover:text-purple-400">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;
