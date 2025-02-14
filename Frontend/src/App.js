import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
// Import the About component
import About from './components/About';
import Cart from './components/Cart'; // Update the import to use Cart instead of ShoppingCart
import PaymentPage from './components/PaymentPage'; // Import the new PaymentPage component
import Contact from './components/Contact'; // Import the Contact component
import './App.css';

// Create a layout component to handle navbar visibility
const Layout = ({ isAuthenticated, onLogout, children }) => {
  const location = useLocation();
  const showNavbar = isAuthenticated && 
    location.pathname !== '/login' && 
    location.pathname !== '/register' &&
    location.pathname !== '/forgot-password';

  return (
    <div className="app-container">
      {showNavbar && <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />}
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route path="/products" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={() => setIsAuthenticated(true)} /> : <Navigate to="/products" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/products" />} />
          <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/products" />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/payment" element={<PaymentPage />} /> {/* Add the new PaymentPage route */}
          <Route path="/contact" element={<Contact />} /> {/* Add the new Contact route */}
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;