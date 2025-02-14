import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdate', updateCartCount);
    return () => window.removeEventListener('cartUpdate', updateCartCount);
  }, []);

  const updateCartCount = () => {
    const username = localStorage.getItem('username') || 'guest';
    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartCount(cart.length);
  };

  // Hide navbar on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            alt="MyStore Logo"
            className="logo"
          />
          MyStore
        </Link>
        <div className="navbar-links">
          <Link to="/about-us" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          {isAuthenticated ? (
            <>
            <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/products" className="nav-link">Home</Link>
              
              <Link to="/cart" className="nav-link go-cart">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRclu1oJgW-9-qhFm6oViHBUaRkIHD3_hdiZQ&s" 
                  alt="Cart Icon" 
                  className="cart-icon" 
                />
                Go To Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <button 
                onClick={() => { 
                  onLogout(); 
                  navigate("/login"); 
                }} 
                className="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
