import React from "react";
import "../../assets/css/Home.css"; // Import the CSS file
import Header from "../../components/students/Header";
import Footer from "../../components/students/Footer";
import FrontPage from "../../components/students/FrontPage";
import { useEffect,useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Testimonials from "../../components/students/Testimonials";
import { BiPackage } from "react-icons/bi";
import Teamhome from "../../components/students/Teamhome";
import Searchbar from "../../components/students/Searchbar";

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
      const statsData = [
        { value: 1232, label: "Students" },
        { value: 64, label: "Courses" },
        { value: 42, label: "Events" },
        { value: 24, label: "Trainers" },
      ];
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
     <Header/>
    <FrontPage/>
    <div className="about-section">
      <div className="text-holder" data-aos="fade-up" data-aos-delay="200">
        <h3>Welcome to TeachToTech – Your Gateway to Professional Growth!</h3>
        <p>
          At TeachToTech, we are committed to empowering individuals and
          businesses through a blend of hands-on experience, cutting-edge
          training programs, and professional website development services.
        </p>
      </div>
      <div className="img-holder" data-aos="fade-up" data-aos-delay="100"></div>
    </div>
    <p className="offering">What We Offer:</p>
    <div className="container" data-aos="fade-up" data-aos-delay="300">
     
      <div className="row">
        {/* Card 1 */}
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                 Internship Opportunities
              </h5>
              <ul>
                <li>Real-World Experience</li>
                <li>Mentorship</li>
                <li>Diverse Fields</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                 Website Building Services
              </h5>
              <ul>
                <li>Custom Website Development</li>
                <li>SEO & Performance Optimization</li>
                <li>E-Commerce Solutions</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Training Programs
              </h5>
              <ul>
                <li>Skill Development</li>
                <li>Certified Courses</li>
                <li>Flexible Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <a href="#" className="read-more">
          <span className="home-readmore">Read More</span>
        </a>
      </div>
    </div>
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
      <section className="choose-products">
      <div className="maincard">
        <h3>Why Choose Our Products?</h3>
        <p className="main-card-content">
          Expertise: Our team of professionals has years of experience in their
          respective fields, ensuring you receive top-notch service and
          guidance. Tailored Solutions: We understand that every individual and
          business is unique, so we offer customized solutions that meet your
          specific needs. Support: From the start of your journey with us, we’re
          here to support you every step of the way, ensuring your goals are met
          with excellence.
        </p>
        <div className="learn-more">Learn More <i className="fas fa-chevron-right"></i></div>
      </div>
      <div className="card1">
        <div className="card-content">
          
          <p className="heading-content">Expert Trainers and Developers</p>
          <p className="inside-content">
            Our team consists of industry professionals who are not just
            trainers but also experienced developers. We bring real-world
            expertise to ensure you gain practical, job-ready skills.
          </p>
        </div>
      </div>
      <div className="card1">
        <div className="card-content">
         
          <p className="heading-content">Comprehensive Learning Approach</p>
          <p className="inside-content">
            We focus on hands-on learning, helping you transition seamlessly
            from theory to implementation and deployment.
          </p>
        </div>
      </div>
      <div className="card1">
        <div className="card-content">
    
          <p className="heading-content">Bridging The Gap</p>
          <p className="inside-content">
            Our tailored courses are designed to bridge the gap between being a
            learner and becoming a confident developer, ready to take on
            real-world challenges.
          </p>
        </div>
      </div>
    </section>
    <div className="team-intro">
    <div class="container2 section-testimonials" data-aos="fade-up" data-aos-delay="400">
				<h2>OUR TEAM<span className="underline"></span> </h2>
				<p>BRIEF INTRODUCTION</p>
			</div>
    <Teamhome/>
    </div>
    <div className="testimonial-section">
    <div class="container2 section-testimonials" data-aos="fade-up" data-aos-delay="400">
				<h2>TESTIMONIALS<span className="underline"></span> </h2>
				<p>WHAT ARE THEY SAYING</p>
			</div>
     <Testimonials/>
    </div>
    <Footer/>
    </div>
  );
};

export default Home;
