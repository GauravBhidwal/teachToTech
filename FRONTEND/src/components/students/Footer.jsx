import React from "react";
import "../../assets/css/Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    <div className="footer">
        <div className="sb_footer section_padding">
            <div className="sb_footer-links">
                <div className="sb_footer-links-div">
                  <span className="heading">TeachToTech</span>
                  <div className="address">
                    <p> C7 , 607 </p>
                    <p>Siddhartha Vihar, Ghaziabad 201009</p>
                    <p class="mt-3"><strong>Phone:</strong> <span>+919015088066</span></p>
                    <p><strong>Email:</strong> <span>posttoteachtoteach@gmail.com</span></p>
                    
                  </div>
                    <div className="socialmedia">
                       <p><FaFacebookF /></p>
                       <p><FaInstagram /></p>
                       <p><FaTwitter /></p>
                       <p><FaLinkedinIn /></p>
                    </div>
               
                </div>
                <div className="sb_footer-links-div">
                    <h4>Useful Links</h4>
                    <ul>
                      <li><a href="/index">Home</a></li>
                      <li><a href="/about">About us</a></li>
                      <li><a href="/courses">Courses</a></li>
                      <li><a href="/contact">Contact</a></li>
                      <li><a href="#">Privacy policy</a></li>
                    </ul>
                </div>
                <div className="sb_footer-links-div">
                <h4>Our Services</h4>
                <ul>
                   <li><a href="/api/users/login">Web Design</a></li>
                   <li><a href="/api/users/login">Web Development</a></li>
                   <li><a href="/api/users/login">Product Management</a></li>
                   <li><a href="/api/users/login">Marketing</a></li>
                   <li><a href="/api/users/login">Graphic Design</a></li>
                </ul>
                </div>

                <div className="newsletter-box">
                    <h5>Our Newsletter</h5>
                    <div className="newsletter-content">
                      <div className="follow-page">Subscribe to our newsletter and receive the latest news about</div>
                      <div className="ending">our products and services!</div>
                    </div>
                    <input type="text" />
                    <button>Subscribe</button>
                   
                </div>
                
            </div>
          
            
        </div>
            <div className="sb_footer-below">
                <div className="sb_footer-copyright">
                   <p className="company-name-footer">
                    @{new Date().getFullYear()} TeachToTech. All rights reserved
                   </p>
                   <p>
                    Credits - Ayushi Gupta, Anoushka Goel, Kesh Chaurasia
                   </p>
                </div>
            </div>
    </div>

    </>
  );
};

export default Footer;
