// import React from 'react'
// import Navbar from './components/Navbar'
// import ShortenForm from './components/ShortenForm'
// import HomePage from './pages/HomePages'
// import Hero from './components/Hero'

// const App = () => {
//   return (
//     <>
    
     
//     {/* <Navbar/>
//     <ShortenForm/> */}
//     <HomePage/>
//     {/* <Hero/> */}
   
//     </>
//   )
// }

// export default App








// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // We'll create this next

// Page Components
import HomePage from './pages/HomePages';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-dark-bg text-dark-text font-sans flex flex-col">
          <Navbar />
          <main className="flex-grow"> {/* main tag to ensure footer stays at bottom */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* Protected Route for Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              {/* You can add a 404 Not Found page here */}
              <Route path="*" element={<h1 className="text-center text-4xl mt-20">404 - Page Not Found</h1>} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;