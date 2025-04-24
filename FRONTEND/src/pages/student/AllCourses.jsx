import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/AllCourses.css";


const AllCourses = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState({});


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post("http://localhost:8080/courses/getAllCourses");
        const data = response.data;

        if (data.status === "SUCCESS" && data.coursesList) {
          setCourses(data.coursesList);
        } else {
          console.error("Failed to fetch courses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post("http://localhost:8080/category/getallcategories");
        const categoryArray = response.data;

        // Create a mapping from category id to title
        const categoryMap = {};
        categoryArray.forEach((cat) => {
          categoryMap[cat.id] = cat.title;
        });

        setCategories(categoryMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const courseItems = document.querySelectorAll(".course-item");
    courseItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 200);
    });
  }, [courses]);

  // ✅ Filter courses based on selectedCategory
  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.categoryId === selectedCategory)
    : courses;

  return (
    <section id="courses" className="courses-section">
      <div className="container">
        
        <div className="courses-row">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-item">
                <img
                  src={`http://localhost:8080/images/${course.image}`}
                  alt={course.courseName}
                  className="course-image"
                />
                <div className="course-content">
                  <p className="category-content">{categories[course.categoryId] || "Unknown Category"}</p>
                  <div className="course-title-row">
                    <h3 className="course-title">{course.courseName}</h3>
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>
                  </div>
                  <p className="course-description">{course.description.split(".")[0] + "."}</p>
                  <hr />
                  <div className="trainer-details">
                    <img
                      src={`http://localhost:8080/images/${course.trainerImage}`}
                      alt={course.trainerName}
                      className="trainer-photo"
                    />
                    <div>
                      <p className="trainer-name">{course.trainerName}</p>
                      <p className="course-info">
                        <i className="fas fa-clock"></i> {course.duration} &nbsp;
                        <i className="fas fa-book"></i> {JSON.parse(course.modules)?.length} modules
                      </p>
                    </div>
                  </div>
                  <div className="button-group">
  <button className="read-more" onClick={() => navigate(`/course/${course.id}`)}>
    Read More
  </button>
  <button
  className="edit-button-course"
  onClick={() => navigate(`/course/edit/${course.id}`)}
>
  Edit
</button>
  <button className="delete-button-course">Delete</button>
</div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-courses">No courses found in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllCourses;
