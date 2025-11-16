// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast'; // For notifications

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // For initial load check

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Function to handle login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('https://backend-url-shortener1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser({ _id: data._id, username: data.username, email: data.email });
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify({ _id: data._id, username: data.username, email: data.email }));
      localStorage.setItem('token', data.token);
      toast.success('Logged in successfully!');
      return true; // Indicate success
    } catch (error) {
      toast.error(error.message);
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  // Function to handle registration
  const register = async (username, email, password) => {
  setLoading(true);
  try {
    const response = await fetch(
      "https://backend-url-shortener1.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast.success("Account created successfully! Please login.");
    return true; // Registration success
  } catch (error) {
    toast.error(error.message);
    return false; // Registration failed
  } finally {
    setLoading(false);
  }
};

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.info('Logged out.');
  };

  // The value provided to consumers of this context
  const authContextValue = {
    user,
    token,
    isAuthenticated: !!user, // Convenience flag
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children} {/* Render children only after initial loading check */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
