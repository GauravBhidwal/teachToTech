import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import Quill from "quill";
import "quill/dist/quill.snow.css";

import '../../assets/css/articles/AddArticle.css';

import axios from "axios";

const EditArticles = () => {
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    const quillInstance = new Quill("#editor-container", {
      theme: "snow",
    });
    quillRef.current = quillInstance;

    // If article data is passed through location.state
    const storedArticle = localStorage.getItem("editArticle");
    if (storedArticle) {
      const { id, title, content, categoryId } = JSON.parse(storedArticle);
      setArticleId(id);
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

  const handleUpdate = async () => {
    const content = quillRef.current.root.innerHTML;

    if (!title || !categoryId || !content || content === "<p><br></p>") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/articles/updatearticle", {
        articleId,
        title,
        content,
        categoryId,
        userId: "1", // You can replace this with actual logged-in user ID
      });

      if (response.data.status === "SUCCESS") {
        alert("Article updated successfully!");
        // Optional: navigate somewhere else
        navigate('/allarticles');
      } else {
        alert("Failed to update article: " + response.data.message);
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Network or Server Error: " + (err?.message || "Unknown error"));
    }   
  };

  return (
    <div>
     
      <div className="font-look-addarticle">
        <h3 className="font-text-article">Edit Article</h3>
      </div>
      <div className="editor-container">
      <select
          className="category-input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="title-input"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div id="editor-container" className="text-editor"></div>
        <div className="article-buttons">
          <button className="submit-button-article" onClick={handleUpdate}>Update</button>
        </div>
      </div>
      
    </div>
  );
};

export default EditArticles;
