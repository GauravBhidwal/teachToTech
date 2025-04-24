import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../assets/css/HeaderArticle.css";

const HeaderArticle = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar-article">
      <div className="logo-container">
        <img src="/TT.png" alt="Logo" className="logo" />
        <span className="brand-name">TEACHTOTECH</span>
      </div>

      {/* Mobile menu button */}
      <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <a href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
        <a href="/allarticles" onClick={() => setIsMobileMenuOpen(false)}>Articles</a>
        <a href="/addarticle" onClick={() => setIsMobileMenuOpen(false)}>Add Article</a>
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </div>
    </nav>
  );
};

export default HeaderArticle;