import React, { useState } from 'react';
import SidebarArticles from './SidebarArticles';
import Footer from '../../../components/students/Footer';
import '../../../assets/css/articles/Articles.css';
import HeaderArticle from '../../../components/students/HeaderArticle';
import axios from 'axios';

const Articles = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notApproved, setNotApproved] = useState(false);

  const fetchArticleById = async (articleId) => {
    setLoading(true);
    setNotApproved(false);
    try {
      const response = await axios.post("http://localhost:8080/articles/getarticlebyid", {
        id: articleId,
      });

      if (response.data.status === "SUCCESS" && response.data.articleList.length > 0) {
        const fetchedArticle = response.data.articleList[0];
        if (fetchedArticle.status === "APPROVED") {
          setArticle(fetchedArticle);
        } else {
          setArticle(null);
          setNotApproved(true);
        }
      } else {
        console.error("Failed to fetch article by ID");
        setArticle(null);
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderArticle />
      <div className="articles-container">
        <SidebarArticles onArticleClick={fetchArticleById} />
        <div className='articles-content'>
          <div className='articles-content-heading'>
            {article ? article.title : "Select an article to view"}
          </div>
          <div className='articles-content-description'>
            {loading ? (
              <p>Loading article...</p>
            ) : notApproved ? (
              <p style={{ fontStyle: 'italic', color: 'gray' }}>
                This article is in progress. Come back later.
              </p>
            ) : article ? (
              <>
                <p><strong>Published on:</strong> {new Date(article.date).toLocaleString()}</p>
                <div
                  className="article-content-display"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <div className="article-comments-section">
                  <h3 style={{ marginTop: '30px', marginBottom: '10px' }}>Comments</h3>
                  {article.comment.length > 0 ? (
                    article.comment.map((c, idx) => (
                      <div key={idx} className="comment-item" style={{ marginBottom: '15px', padding: '10px' }}>
                        <p><strong>User {c.userId}:</strong> {c.content}</p>                 
                      </div>
                    ))
                  ) : (
                    <p style={{ fontStyle: 'italic', color: 'gray' }}>No comments yet.</p>
                  )}
                </div>
              </>
            ) : (
              <p>No article selected.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Articles;
