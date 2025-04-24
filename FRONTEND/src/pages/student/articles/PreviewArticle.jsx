import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderArticle from '../../../components/students/HeaderArticle';
import Footer from '../../../components/students/Footer';
import '../../../assets/css/articles/PreviewArticle.css';
import axios from 'axios';

const PreviewArticle = () => {
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("previewArticle");
    if (stored) {
      setArticle(JSON.parse(stored));
    }
  }, []);

  const handleEdit = () => {
    navigate("/addarticle", { state: { article } }); // send article to edit
  };

  const handleSubmit = async () => {
    if (!article?.title || !article?.categoryId || !article?.content || article.content === "<p><br></p>") {
      alert("Missing data! Please ensure all fields are filled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/articles/createarticle", {
        title: article.title,
        content: article.content,
        categoryId: article.categoryId,
        userId: "1", // Replace with dynamic user ID if needed
      });

      if (response.data.status === "SUCCESS") {
        alert("Article submitted successfully!");
        localStorage.removeItem("previewArticle"); // clear after submit
        navigate("/articlesubmit");
      } else {
        alert("Failed to submit article: " + response.data.message);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Network error: " + (err?.message || "Unknown"));
    }
  };

  const getCategoryName = (id) => {
    const categories = {
      1: 'Technology',
      2: 'Health',
      3: 'Education',
      4: 'Sports',
      5: 'Science',
    };
    return categories[id] || 'Unknown';
  };

  return (
    <>
      <HeaderArticle />
      <div className='preview-container'>
        <h1>Preview Your Article</h1>

        {article ? (
          <div className="preview-article-content" style={{ textAlign: 'left' }}>
            <h2>{article.title}</h2>
            <p><strong>Category:</strong> {getCategoryName(article.categoryId)}</p>
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            />
          </div>
        ) : (
          <p>No article found for preview.</p>
        )}

        <div className='preview-buttons'>
          <button className='edit-button' onClick={handleEdit}>Edit</button>
          <button className='submit-button' onClick={handleSubmit}>Submit+</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreviewArticle;
