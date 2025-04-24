import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/adminCSS/AllArticles.css'

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState(null); 
  const [commentText, setCommentText] = useState(""); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const response = await axios.post('http://localhost:8080/articles/getallarticles');
      if (response.data.status === "SUCCESS") {
        setArticles(response.data.articleList);
      } else {
        alert('Failed to fetch articles: ' + response.data.message);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      alert("Network error: " + err.message);
    }
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  const handleStatusUpdate = async (articleId, newStatus) => {
    try {
      await axios.post('http://localhost:8080/articles/updatearticlestatus', {
        articleId,
        newStatus,
      });
      fetchArticles();
      window.location.reload();
    } catch (err) {
      console.error('Error updating status:', err);
      alert("Failed to update status.");
    }
  };


  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = (article) => {
    localStorage.setItem("editArticle", JSON.stringify(article));
    navigate("/editarticle"); // assumes you have a route to handle edit
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this article?");
    if (!confirmed) return;
  
    try {
      const response = await axios.delete("http://localhost:8080/articles/deletearticlebyid", {
        data: { id: id },
        headers: { "Content-Type": "application/json" }
      });
  
      if (response.data.status === "SUCCESS") {
        alert("Article deleted successfully.");
        setArticles((prevArticles) => prevArticles.filter(article => article.id !== id)); 
      } else {
        alert("Failed to delete the article.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("An error occurred while deleting the article.");
    }
  };
  const handlePreview = async (articleId) => {
    try {
      const response = await axios.post("http://localhost:8080/articles/getarticlebyid", {
        id: articleId
      });
  
      if (response.data.status === "SUCCESS" && response.data.articleList.length > 0) {
        const selectedArticle = response.data.articleList[0];
        localStorage.setItem("previewArticle", JSON.stringify(selectedArticle));
        navigate("/adminpreview");
      } else {
        alert("Failed to load article for preview.");
      }
    } catch (error) {
      console.error("Error loading article preview:", error);
      alert("Something went wrong while previewing the article.");
    }
  };
  
  

  const handleComment = (id) => {
    setCommentBoxVisible(prev => (prev === id ? null : id)); // toggle the comment box
    setCommentText("")
  };
  const submitComment = async (articleId) => {
    try {
      await axios.post('http://localhost:8080/articles/addcomment', {
        articleId,
        userId: "1", // Ideally replace this with actual logged-in user ID
        content: commentText,
      });
      alert("Comment added successfully!");
      setCommentBoxVisible(null);
      setCommentText("");
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert("Failed to submit comment.");
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (sortOrder === 'asc') return valA > valB ? 1 : -1;
    else return valA < valB ? 1 : -1;
  });

  return (
    <div className="all-users-container">
      <button type="button" className="back-button" onClick={handleBack}>← Back</button>

      <div className="search-sort">
        <h2>All Articles</h2>
        <input
          type="text"
          placeholder="Search by title..."
          className="search-allusers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sortby-allusers"
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field);
            setSortOrder(order);
          }}
        >
          <option value="none-asc">Sort by</option>
          <option value="id-asc">ID Ascending</option>
          <option value="id-desc">ID Descending</option>
        </select>
      </div>

      <table className="table table-striped table-hover">
        <thead className="heading">
          <tr>
            <th>S.NO</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map((article, index) => (
            <tr key={article.id}>
              <td>{index + 1}</td>
              <td>{article.userId}</td>
              <td>{article.title}</td>
              <td>{article.status}</td>
              <td>{new Date(article.date).toLocaleString()}</td>
              <td>
                <button className="update-btn" onClick={() => handleEdit(article)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(article.id)}>Delete</button>
                <button className="btn-comment" onClick={() => handleComment(article.id)}>
                  Comment
                </button>
                <button className="preview-btn" onClick={()=>handlePreview(article.id)}>Preview</button>

                {commentBoxVisible === article.id && (
                  <div className="comment-box">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Enter your comment..."
                      className="comment-textarea"
                    />
                    <button className="submit-comment-btn" onClick={() => submitComment(article.id)}>
                      Submit
                    </button>
                  </div>
                )}

                <select
                  onChange={(e) => handleStatusUpdate(article.id, e.target.value)}
                  defaultValue=""
                  className="status-dropdown"
                >
                  <option value="" disabled>Update Status</option>
                  <option value="APPROVED">Approve</option>
                  <option value="REJECTED">Reject</option>
                  <option value="PENDING">Pending</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllArticles;
