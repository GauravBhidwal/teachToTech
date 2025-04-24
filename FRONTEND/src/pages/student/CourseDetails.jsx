import React, { useState, useEffect } from 'react';
import '../../assets/css/CourseDetails.css';
import { useParams } from "react-router-dom";
import Header from '../../components/students/Header';
import Footer from '../../components/students/Footer';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await axios.post("http://localhost:8080/courses/getCourseById", {
          courseId: id,
        });

        if (response.data.status === "Course with ID found") {
          setCourse(response.data.coursesList[0]);
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course by ID:", error);
      }
    };

    fetchCourseById();
  }, [id]);

  if (!course) {
    return (
      <div className="loading">
        <p>Loading Course Details...</p>
      </div>
    );
  }

  const modules = JSON.parse(course.modules);

  return (
    <>
      <Header />
      <div className="course-container">
        {/* Left Column - Course Details */}
        <div className="course-info">
          <h1>{course.courseName}</h1>
          <img
            src={`http://localhost:8080/images/${course.image}`}
            alt={course.courseName}
            className="course-image"
          />
          <p className="description">{course.description}</p>

          <h4>
            Course Structure:
            <span className="module-count"> ({modules.length} Modules)</span>
          </h4>

          {/* Course Structure Section */}
          <div className="course-structure">
            {modules.map((module, index) => (
              <div key={index} className="module">
                <div className="module-header" onClick={() => toggleModule(index)}>
                  <span className="module-title">{module.title}</span>
                  <span className={`arrow ${expandedModule === index ? "open" : ""}`}>
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </div>
                {expandedModule === index && (
                  <div className="module-details">
                    <p className="module-description">{module.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - YouTube Video & Info */}
        <div className="video-container">
          <div className="responsive-video">
            <iframe
              src={course.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p className='smalldescription'>
            <strong className='course-heading'>Schedule: </strong> {course.schedule}
          </p>
          <p className='smalldescription'>
            <strong className='course-heading'>Timings: </strong> {course.timings}
          </p>
          <p className='smalldescription'>
            <strong className='course-heading'>Course Fee: </strong> ₹{course.price}
          </p>
          <p className='smalldescription'>
            <strong className='course-heading'>Duration: </strong> {course.duration}
          </p>
          <p className='smalldescription'>
            <strong className='course-heading'>Modules: </strong> {modules.length}
          </p>

          <h4>Associated Trainer:</h4>
          <div className="trainer-container">
            <img
              src={`http://localhost:8080/images/${course.trainerImage}`}
              alt="Trainer"
              className="trainer-image"
            />
            <div className="trainer-info">
              <p className="trainer-name">{course.trainerName}</p>
              <p className="trainer-description">{course.trainerDescription}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
