
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../assets/css/adminCSS/AddTrainer.css';

const AddCourse = () => { 

  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    schedule: '',
    timings: '',
    image: null,
    duration: '',
    price: '',
    videoUrl: '',
    categoryId: '',
    username: ''
  });
  const [originalImageUrl, setOriginalImageUrl] = useState(''); 
  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [loading, setLoading] = useState({
    categories: true,
    trainers: true,
    courseData: isEdit
  });
  const [error, setError] = useState({
    categories: null,
    trainers: null,
    submission: null,
    courseData:null
  });

  useEffect(() => {
    if (isEdit && courseId) {
      const fetchCourseData = async () => {
        try {
          const response = await axios.post('http://localhost:8080/courses/getCourseById', {
            courseId: courseId
          });
          
          const course = response.data.coursesList[0];
          
          // Set form data
          setFormData({
            courseName: course.courseName,
            description: course.description,
            schedule: course.schedule,
            timings: course.timings,
            image: null, // Keep as null, we'll handle image separately
            duration: course.duration,
            price: course.price,
            videoUrl: course.videoUrl,
            categoryId: course.categoryId,
      
          });
          
          setOriginalImageUrl(course.courseImage || '');
          setModules(course.modules || []);
          setSelectedTrainerId(course.userId); // Adjust based on your data structure
          
          setLoading(prev => ({ ...prev, courseData: false }));
        } catch (err) {
          console.error('Error fetching course data:', err);
          setError(prev => ({ ...prev, courseData: 'Failed to load course data' }));
        }
      };
      
      fetchCourseData();
    }
  }, [isEdit, courseId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch categories and trainers when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(prev => ({ ...prev, categories: true }));
        const response = await axios.post('http://localhost:8080/category/getallcategories');
        setCategories(response.data);
        setError(prev => ({ ...prev, categories: null }));
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(prev => ({ ...prev, categories: 'Failed to load categories. Please try again later.' }));
      } finally {
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };

    const fetchTrainers = async () => {
      try {
        setLoading(prev => ({ ...prev, trainers: true }));
        const response = await axios.post('http://localhost:8080/trainer/getAlltrainers');
        if (response.data.status === 'SUCCESS') {
          setTrainers(response.data.trainerList);
          setError(prev => ({ ...prev, trainers: null }));
        } else {
          throw new Error('Failed to fetch trainers');
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError(prev => ({ ...prev, trainers: 'Failed to load trainers. Please try again later.' }));
      } finally {
        setLoading(prev => ({ ...prev, trainers: false }));
      }
    };

    fetchCategories();
    fetchTrainers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTrainerChange = (e) => {
    setSelectedTrainerId(e.target.value);
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const addModule = () => {
    setModules([...modules, { title: '', description: '' }]);
  };

  const removeModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  // Reset form after successful submission
  const resetForm = () => {
    setFormData({
      courseName: '',
      description: '',
      schedule: '',
      timings: '',
      image: null,
      duration: '',
      price: '',
      videoUrl: '',
      categoryId: '',
      username: ''
    });
    setModules([]);
    setSelectedTrainerId('');
    setSubmitSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(prev => ({ ...prev, submission: null }));

    // Validate form
    if (!selectedTrainerId) {
      setError(prev => ({ ...prev, submission: 'Please select a trainer' }));
      setIsSubmitting(false);
      return;
    }

    if (modules.length === 0) {
      setError(prev => ({ ...prev, submission: 'Please add at least one module' }));
      setIsSubmitting(false);
      return;
    }

    if (!formData.image) {
      setError(prev => ({ ...prev, submission: 'Please select a course image' }));
      setIsSubmitting(false);
      return;
    }

    // Get selected trainer details
    const selectedTrainer = trainers.find(t => t.trainerId.toString() === selectedTrainerId);
    
    if (!selectedTrainer) {
      setError(prev => ({ ...prev, submission: 'Selected trainer not found' }));
      setIsSubmitting(false);
      return;
    }

    // Get selected category name
    const selectedCategory = categories.find(c => c.id === formData.categoryId);
    const categoryName = selectedCategory ? selectedCategory.title : "";

    // Create the course object that matches your JSON structure
    const courseObject = {
      id: null,
      courseName: formData.courseName,
      category: categoryName,
      description: formData.description,
      trainerName: selectedTrainer.trainerName,
      trainerDescription: selectedTrainer.trainerDescription,
      trainerImage: selectedTrainer.trainerImage || "",
      duration: formData.duration,
      modules: modules,
      videoUrl: formData.videoUrl,
      schedule: formData.schedule,
      timings: formData.timings,
      price: formData.price,
      categoryId: formData.categoryId,
      status: "PENDING",
      rejectionComment: null,
      userId: selectedTrainer.userId,
      recStatus: "A"
      // Removed trainerId field as it's not recognized by the backend
    };

    // Create the request payload that matches your JSON structure
    const requestPayload = {
      coursesList: [courseObject],
      userCredentials: {
        userId: formData.username
      }
    };

    try {
      // Create FormData object for multipart/form-data submission
      const formDataToSend = new FormData();
      
      // Add JSON part as a string
      formDataToSend.append('requestData', JSON.stringify(requestPayload));
      
      // Add course image
      formDataToSend.append('courseImages', formData.image);
      
      console.log('Sending course creation request with image');
      
      const response = await axios.post(
        'http://localhost:8080/courses/createCourses', 
        formDataToSend, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log('Course creation response:', response.data);
      
      if (response.data && (response.data.status === 'SUCCESS' || response.data.status === 200)) {
        // Reset form after successful submission
        resetForm();
      } else {
        throw new Error(response.data?.message || 'Failed to create course');
      }
    } catch (err) {
      console.error('Error submitting course:', err);
      setError(prev => ({ 
        ...prev, 
        submission: err.response?.data?.message || err.message || 'Failed to submit course. Please try again.' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
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
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  
  const handleBack = () => {
    window.history.back();
  };

  // Find the selected trainer details
  const selectedTrainerDetails = trainers.find(t => t.trainerId.toString() === selectedTrainerId);

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <button type="button" className="back-button" onClick={handleBack}>← Back</button>

        {submitSuccess && (
          <div className="success-message">
            Course submitted successfully!
          </div>
        )}

        <form className="trainer-form" onSubmit={handleSubmit}>
          <h2>Add Course</h2>
          {/* Dynamic Categories Dropdown */}
          <select 
            name="categoryId" 
            value={formData.categoryId} 
            onChange={handleChange} 
            required
            disabled={loading.categories}
          >
            <option value="" disabled>
              {loading.categories ? 'Loading categories...' : 'Select Category'}
            </option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {error.categories && <div className="error-message">{error.categories}</div>}

          <input type="text" name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleChange} required />
          <textarea name="description" placeholder="Course Description" value={formData.description} onChange={handleChange} rows="4" required />
          <textarea name="schedule" placeholder="Course Schedule" value={formData.schedule} onChange={handleChange} rows="4" required />
          <textarea name="timings" placeholder="Course Timings" value={formData.timings} onChange={handleChange} rows="4" required />

          <div className="file-input-container">
            <label>Course Image:</label>
            <input type="file" name="image" accept="image/jpeg, image/png" onChange={handleChange} required />
            <small>Only .jpg and .png images are allowed.</small>
          </div>

          <input type="text" name="duration" placeholder="Course Duration (e.g., '8 weeks')" value={formData.duration} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required step="0.01" />
          <input type="url" name="videoUrl" placeholder="Video URL" value={formData.videoUrl} onChange={handleChange} required />

          <h3>Modules</h3>
          {modules.length === 0 && (
            <p className="empty-modules-message">No modules added yet. Add at least one module.</p>
          )}
          {modules.map((module, index) => (
            <div key={index} className="module-group">
              <input
                type="text"
                placeholder="Module Title"
                value={module.title}
                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                required
              />
              <textarea
                placeholder="Module Description (e.g., '2 weeks')"
                value={module.description}
                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                rows="2"
                required
              />
              <button type="button" className="remove-button" onClick={() => removeModule(index)}>Remove</button>
            </div>
          ))}
          <button type="button" className="add-module-button" onClick={addModule}>+ Add Module</button>

          {/* Dynamic Trainers Dropdown - Single selection */}
          <select 
            name="trainerId" 
            value={selectedTrainerId} 
            onChange={handleTrainerChange} 
            required
            disabled={loading.trainers}
          >
            <option value="" disabled>
              {loading.trainers ? 'Loading trainers...' : 'Select Trainer'}
            </option>
            {trainers.map(trainer => (
              <option key={trainer.trainerId} value={trainer.trainerId}>
                {trainer.trainerName}
              </option>
            ))}
          </select>
          {error.trainers && <div className="error-message">{error.trainers}</div>}
          
          {/* Show selected trainer details */}
          {selectedTrainerDetails && (
            <div className="selected-trainer-info">
              <h4>Selected Trainer Details</h4>
              <p><strong>Name:</strong> {selectedTrainerDetails.trainerName}</p>
              <p><strong>Qualification:</strong> {selectedTrainerDetails.trainerQualification}</p>
              <p><strong>Description:</strong> {selectedTrainerDetails.trainerDescription}</p>
            </div>
          )}

          <h3>Admin Credentials</h3>
          <input type="text" name="username" placeholder="Admin User ID" value={formData.username} onChange={handleChange} required />

          {error.submission && <div className="error-message">{error.submission}</div>}

          <div className="form-buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;