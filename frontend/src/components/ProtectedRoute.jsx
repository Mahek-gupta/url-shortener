// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Optionally render a loading spinner or message
    return <div className="text-center mt-20 text-xl">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    // User is not authenticated, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  return children; // User is authenticated, render the children (the protected page)
};

export default ProtectedRoute;