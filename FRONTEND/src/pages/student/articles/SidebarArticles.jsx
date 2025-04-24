import React, { useState, useEffect } from 'react';
import '../../../assets/css/SidebarArticles.css';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SidebarArticles = ({ onArticleClick }) => {
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/category/with-articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        const transformed = data.map((cat) => ({
          name: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
          subcategories: cat.articles.map((article) => ({
            id: article.id,
            title: article.title,
          })),
        }));
        setCategories(transformed);
      }
    })
    .catch((error) => console.error('Error:', error));
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleArticleClick = (id) => {
    onArticleClick(id);
    if (windowWidth <= 992) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      {windowWidth <= 992 && (
        <button 
          className="mobile-toggle" 
          onClick={toggleMobileSidebar}
          aria-label="Toggle sidebar"
        >
          {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      <div className={`sidebar-articles ${windowWidth <= 992 ? (isMobileOpen ? 'open' : 'collapsed') : ''}`}>
        <div className="sidebar-header">
          <h3>Categories</h3>
        </div>
        <div className="sidebar-content">
          <ul className="menu">
            {categories.map((category) => (
              <li className="menu-item" key={category.name}>
                <div className="category" onClick={() => toggleDropdown(category.name)}>
                  {category.name}
                  {openDropdown === category.name ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {openDropdown === category.name && (
                  <ul className="sidebar-dropdown">
                    {category.subcategories.map((sub) => (
                      <li key={sub.id} onClick={() => handleArticleClick(sub.id)}>
                        {sub.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarArticles;