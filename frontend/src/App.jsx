import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import HomePage from './pages/HomePages';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ✅ Only using AnalyticsModal (not AnalyticsPages)
import AnalyticsModal from './components/AnalyticsModal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gray-200 dark:bg-dark-bg  text-dark-text font-sans flex flex-col ">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* ✅ Protected Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* ❌ Removed old AnalyticsPage route */}
              {/* <Route path="/analytics/:shortCode" element={<AnalyticsPages />} /> */}

              {/* ✅ Optional: Direct modal route (if needed for testing) */}
              {/* <Route path="/analytics" element={<AnalyticsModal />} /> */}

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <h1 className="text-center text-4xl mt-20">
                    404 - Page Not Found
                  </h1>
                }
              />
            </Routes>
          </main>

          {/* Optional Footer */}
          {/* <Footer /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
