import React, { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import "../../assets/css/Header.css";
import { Link } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/category/getallcategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCourseCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
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
        
        <div
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <a href="/allcourses" className="dropdown-trigger">All Courses</a>
          <FaChevronDown className="fa-chevron-down" style={{ color: "black", cursor: "pointer" }} />
          
          {showDropdown && (
            <div className="dropdown-menu">
              {courseCategories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/allcourses/${cat.id}`} 
                  className="dropdown-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <a href="/team" onClick={() => setIsMobileMenuOpen(false)}>Team</a>
        <a href="/notes" onClick={() => setIsMobileMenuOpen(false)}>Notes</a>
        <a href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
        <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        <a href="/allarticles" onClick={() => setIsMobileMenuOpen(false)}>Articles</a>
        
        {/* Admin Section Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setShowAdminDropdown(true)}
          onMouseLeave={() => setShowAdminDropdown(false)}
          onClick={() => setShowAdminDropdown(!showAdminDropdown)}
        >
          <a href="#" className="dropdown-trigger">Admin Section</a>
          <FaChevronDown className="fa-chevron-down" style={{ color: "black", cursor: "pointer" }} />
          {showAdminDropdown && (
            <div className="dropdown-menu">
              <a href="/admin/addnotes" onClick={() => setIsMobileMenuOpen(false)}>Add Notes</a>
              <a href="/admin/addcourse" onClick={() => setIsMobileMenuOpen(false)}>Add Course</a>
              <a href="/admin/addtrainer" onClick={() => setIsMobileMenuOpen(false)}>Add Trainer</a>
              <a href="/admin/addassignment" onClick={() => setIsMobileMenuOpen(false)}>Add Assignment</a>
              <a href="/admin/allusers" onClick={() => setIsMobileMenuOpen(false)}>All Users</a>
              <a href="/admin/allarticlesforadmin" onClick={() => setIsMobileMenuOpen(false)}>All Articles</a>
            </div>
          )}
        </div>

        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;