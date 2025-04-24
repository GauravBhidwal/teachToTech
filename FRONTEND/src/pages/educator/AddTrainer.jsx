import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/adminCSS/AddTrainer.css';

const AddTrainer = () => {
  const [trainerDetails, setTrainerDetails] = useState({
    trainerName: '',
    trainerDescription: '',
    trainerQualification: '',
    linkedin: '',
    categoryId: '1',
    userId: '', // userId for trainersList
  });

  const [userCredentials, setUserCredentials] = useState({
    userId: '', // userId for userCredentials
  });

  const [trainerImage, setTrainerImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/category/getallcategories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [baseURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('userCredentials')) {
      setUserCredentials((prevState) => ({
        ...prevState,
        [name.split('.')[1]]: value, // Dynamically set fields inside userCredentials
      }));
    } else {
      setTrainerDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTrainerImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData();

    // Append trainerDetails under trainersList
    formData.append('trainersList.trainerName', trainerDetails.trainerName);
    formData.append('trainersList.trainerDescription', trainerDetails.trainerDescription);
    formData.append('trainersList.trainerQualification', trainerDetails.trainerQualification);
    formData.append('trainersList.linkedin', trainerDetails.linkedin);
    formData.append('trainersList.categoryId', trainerDetails.categoryId);
    formData.append('trainersList.userId', trainerDetails.userId); // userId for trainersList

    // Append userCredentials.userId
    formData.append('userCredentials.userId', userCredentials.userId); // userId for userCredentials

    // Append the trainer image
    if (trainerImage) {
      formData.append('trainerImage', trainerImage);
    }

    try {
      const response = await axios.post(`${baseURL}/trainer/createTrainers`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Trainer created:', response.data);
      setSuccess(true);
      setTrainerDetails({
        trainerName: '',
        trainerDescription: '',
        trainerQualification: '',
        linkedin: '',
        categoryId: '',
        userId: '',
      });
      setUserCredentials({ userId: '' }); // Reset userCredentials
      setTrainerImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Error creating trainer:', err);
      setError('Failed to create trainer. Please check your input or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-trainer-container">
      <h2>Add New Trainer</h2>
      <form onSubmit={handleSubmit} className="add-trainer-form">
        <input
          type="text"
          name="trainerName"
          placeholder="Trainer Name"
          value={trainerDetails.trainerName}
          onChange={handleChange}
          required
        />
        <textarea
          name="trainerDescription"
          placeholder="Trainer Description"
          value={trainerDetails.trainerDescription}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="trainerQualification"
          placeholder="Trainer Qualification"
          value={trainerDetails.trainerQualification}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={trainerDetails.linkedin}
          onChange={handleChange}
        />
        {/* <select
          name="categoryId"
          value={trainerDetails.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryTitle}
            </option>
          ))}
        </select> */}
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={trainerDetails.userId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userCredentials.userId"
          placeholder="User Credentials ID"
          value={userCredentials.userId}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Trainer'}
        </button>
        {success && <p className="success-message">Trainer created successfully!</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddTrainer;
