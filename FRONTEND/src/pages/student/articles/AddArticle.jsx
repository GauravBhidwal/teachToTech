import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import Quill from "quill";
import "quill/dist/quill.snow.css";
import Footer from '../../../components/students/Footer';
import '../../../assets/css/articles/AddArticle.css';
import HeaderArticle from "../../../components/students/HeaderArticle";
import axios from "axios";

const AddArticle = () => {
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");

  const location = useLocation();
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
const [newCategoryTitle, setNewCategoryTitle] = useState("");

const handleCategoryChange = (e) => {
  const selected = e.target.value;
  if (selected === "add-new") {
    setShowNewCategoryInput(true);
    setCategoryId(""); // Reset selected category
  } else {
    setShowNewCategoryInput(false);
    setCategoryId(selected);
  }
};

const handleAddNewCategory = async () => {
  if (!newCategoryTitle.trim()) {
    alert("Category title cannot be empty");
    return;
  }

  try {
    const res = await axios.post("http://localhost:8080/category/addcategory", {
      title: newCategoryTitle
    });

    const newCat = res.data;
    setCategories([...categories, newCat]);
    setCategoryId(newCat.id);
    setShowNewCategoryInput(false);
    setNewCategoryTitle("");
  } catch (err) {
    console.error("Failed to add new category:", err);
    alert("Error adding new category");
  }
};


  useEffect(() => {
    const quillInstance = new Quill("#editor-container", {
      theme: "snow",
    });
    quillRef.current = quillInstance;
    if (location.state?.article) {
      const { title, content, categoryId } = location.state.article;
      setTitle(title);
      setCategoryId(categoryId);
      quillInstance.root.innerHTML = content;
    }
    const fetchCategories = async () => {
      try {
        const res = await axios.post("http://localhost:8080/category/getallcategories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePreview = () => {
    const content = quillRef.current.root.innerHTML;
    const articleData = {
      title,
      content,
      categoryId,
    };
    localStorage.setItem("previewArticle", JSON.stringify(articleData));
    navigate('/previewarticle');
  };

  const handleSubmit = async () => {
    const content = quillRef.current.root.innerHTML;

    if (!title || !categoryId || !content || content === "<p><br></p>") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // ⚠️ No need to use full URL here if proxy is set in vite.config.js
      const response = await axios.post("http://localhost:8080/articles/createarticle", {
        title,
        content,
        categoryId,
        userId: "1", // Hardcoded userId for now
      });

      if (response.data.status === "SUCCESS") {
        alert("Article submitted successfully!");
        navigate('/articlesubmit');
      } else {
        alert("Failed to submit article: " + response.data.message);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Network or Server Error: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <div>
      <HeaderArticle />
      <div className="font-look-addarticle">
        <h3 className="font-text-article">Add Article</h3>
      </div>
      <div className="editor-container">
      <select
  className="category-input"
  value={categoryId}
  onChange={handleCategoryChange}
>
  <option value="" disabled>Select a Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.title}
    </option>
  ))}
  <option value="add-new">+ Add New Category</option>
</select>

{showNewCategoryInput && (
  <div className="new-category-input">
    <input
      type="text"
      placeholder="Enter new category"
      className="title-input"
      value={newCategoryTitle}
      onChange={(e) => setNewCategoryTitle(e.target.value)}
    />
    <button
      className="submit-button-article mt-2"
      onClick={handleAddNewCategory}
    >
      Add Category
    </button>
  </div>
)}

        <input
          type="text"
          className="title-input"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="editor-container" className="text-editor"></div>
        <div className="article-buttons">
          <button className="preview-button-article" onClick={handlePreview}>Preview</button>
          <button className="submit-button-article" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddArticle;
