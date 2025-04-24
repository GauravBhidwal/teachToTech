import React, { useState } from 'react';
import Header from '../../components/students/Header';
import Footer from '../../components/students/Footer';
import '../../assets/css/CourseList.css';
import courseRahul from "../../assets/img/course-rahul.jpg";
import Internship from '../../assets/img/Internship.jpg';
import Webdevelopment from '../../assets/img/WebDevelopment.jpg';
import AllCourses from './AllCourses';
import { useParams} from 'react-router-dom';

const CourseList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { categoryId } = useParams();

  const slides = [
    {
      img: courseRahul,
      title: "Courses",
      description:
        "At TeachToTech, we bridge the gap between curiosity and expertise in the world of Information Technology. Our courses are designed to equip learners with practical, in-demand tech skills—from coding and cybersecurity to data analytics and cloud computing. Whether you're a beginner or a professional looking to upskill, we provide flexible, hands-on learning guided by industry experts. Start your journey with us and take a step toward mastering the future of technology!",
    },
    {
      img: Internship,
      title: "Internship",
      description:
        "An internship program for students is designed to provide hands-on learning and professional experience in a specific field. It bridges the gap between academic knowledge and practical application, helping students develop industry-relevant skills and insights. These programs often involve mentoring, real-world projects, and exposure to workplace environments, fostering personal and professional growth.",
    },
    {
      img: Webdevelopment,
      title: "Web Development",
      description:
        "TeachToTech offers a comprehensive learning experience. It covers core Java, Servlets, JSP, and advanced frameworks like Spring and Hibernate. Students learn to build dynamic web applications, integrate databases with JDBC and Hibernate, and create RESTful APIs. The program emphasizes hands-on projects, deployment on servers like Tomcat, and front-end integration with tools like Thymeleaf. A capstone project ensures practical expertise, preparing students for real-world Java web development challenges.",
    },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };
  

  return (
    <div>
      <Header />
      <div className="page-title">
        <section id="hero" className="hero section dark-background">
          <div className="carousel">
            <div className="carousel-inner">
              {slides.map((slide, index) => (
               <div
               key={index}
               className={`carousel-item ${index === currentIndex ? "active" : ""}`}
               style={{ display: index === currentIndex ? "block" : "none" }} // Only show the active slide
             >
                  <div className="carousel-image">
                    <img src={slide.img} alt={`Course Image ${index + 1}`} />
                    <div className="hero-content">
                      <div className="container">
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" onClick={goToPrev}>
            <span class="fas fa-chevron-left"></span>
            </button>
            <button className="carousel-control-next" onClick={goToNext}>
            <span class="fas fa-chevron-right"></span>
            </button>
          </div>
        </section>

        <nav className="breadcrumbs">
          <div className="container">
                <a href="/">Home</a><span> / Courses</span>
          </div>
        </nav>
      </div>
      <div>
      <AllCourses selectedCategory={categoryId}/>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseList;
