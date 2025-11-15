// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    if (success) navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="flex bg-gray-300 dark:bg-dark-bg items-center justify-center min-h-[calc(100vh-80px-80px)] py-12 px-4 md:pt-20 pt-16">
      <div
        className="
          max-w-md w-full 
          p-8 rounded-2xl
          bg-white/10 dark:bg-white/5
          backdrop-blur-xl 
          border border-white/20 
          shadow-xl shadow-purple-500/10
          transition transform duration-300
          hover:shadow-purple-500/30 hover:scale-[1.01]
        "
      >
        <h2 className="text-3xl font-extrabold text-light-text text-center mb-6 gradient-text">
          Sign In to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-500">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                mt-1 block w-full px-4 py-2 
                bg-gray-800/40 border border-gray-700 
                rounded-md shadow-sm 
                placeholder-gray-500 text-dark-text 
                focus:outline-none focus:ring-primary-purple focus:border-primary-purple
                backdrop-blur-sm
              "
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300 text-gray-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                mt-1 block w-full px-4 py-2 
                bg-gray-800/40 border border-gray-700 
                rounded-md shadow-sm 
                placeholder-gray-500 text-dark-text 
                focus:outline-none focus:ring-primary-purple focus:border-primary-purple
                backdrop-blur-sm
              "
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm font-medium text-primary-purple hover:text-purple-400">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex justify-center py-2 px-4
              rounded-md text-lg font-medium text-white
              bg-primary-purple hover:bg-purple-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="font-medium text-primary-purple hover:text-purple-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
