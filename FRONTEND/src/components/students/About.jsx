import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";
import "../../assets/css/About.css";
import { FaCheck } from "react-icons/fa";
import Testimonials from "./Testimonials";



const About = () => {
  const statsData = [
    { value: 1232, label: "Students" },
    { value: 64, label: "Courses" },
    { value: 42, label: "Events" },
    { value: 24, label: "Trainers" },
  ];
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const updateCounts = () => {
      setCounts((prevCounts) =>
        prevCounts.map((count, index) =>
          Math.min(
            count + Math.ceil(statsData[index].value / (duration / 16)),
            statsData[index].value
          )
        )
      );
      requestAnimationFrame(updateCounts);
    };
    updateCounts();
  }, []);

  return (
    <div>
      <Header />
      <div className="font-look2">
        <div className="content-box" data-aos="fade-up" data-aos-delay="200">
          <h2 className="font-text">About us</h2>
          <p className="content">
            At TeachToTech, we empower students and professionals to unlock their
            potential and secure their dream careers. Our mission is to bridge the
            gap between academic knowledge and industry expectations by providing
            hands-on training in cutting-edge technologies and essential workplace
            skills.
          </p>
        </div>
      </div>

      <nav className="breadcrumbs">
          <div className="container">
                <a href="/">Home</a><span> / About us </span>
          </div>
        </nav>

      <section id="about-us" className="about-us">
        <div className="about-container" data-aos="fade-up" data-aos-delay="300">
          <div className="about-content">
            <h3>Welcome to TeachToTech – Your Gateway to Professional Growth!</h3>
            <p>
              At TeachToTech, we are committed to empowering individuals and businesses
              through hands-on experience, cutting-edge training programs, and professional
              website development services.
            </p>
            <ul>
              {[
                "Comprehensive Job Placement Training: Resume building, interview prep, and communication skills.",
                "Industry-Relevant Courses: AI, Data Science, Web Development, Cloud Computing, and more.",
                "Real-World Projects: Live projects that simulate real-world challenges.",
              ].map((text, index) => (
                <li key={index}>
                  <FaCheck className="check-icon" /> <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="about-image">
            <img src="/about-2.jpg" alt="About" />
          </div>
        </div>
      </section>

      <section id="counts" className="counts">
        <div className="stats-container">
          {statsData.map((stat, index) => (
            <div key={index} className="stats-item">
              <span>{counts[index]}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      
      <div class="container2 section-testimonials" data-aos="fade-up" data-aos-delay="400">
				<p>TESTIMONIALS<span className="underline"></span> </p>
				<h2>WHAT ARE THEY SAYING</h2>
			</div>
     <Testimonials/>
      <Footer />
    </div>
  );
};

export default About;
