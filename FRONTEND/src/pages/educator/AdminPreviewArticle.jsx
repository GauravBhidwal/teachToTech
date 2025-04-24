import React, { useEffect, useState } from 'react';

const AdminPreviewArticle = () => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const savedArticle = JSON.parse(localStorage.getItem("previewArticle"));
    setArticle(savedArticle);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {article ? (
        <>
          <h1>{article.title}</h1>
          <p><strong>Published on:</strong> {new Date(article.date).toLocaleString()}</p>
          <div
            className="article-content-display"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <hr />
          <h3>Comments</h3>
          {article.comment.length > 0 ? (
            article.comment.map((com, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                <p><strong>User {com.userId}:</strong> {com.content}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </>
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default AdminPreviewArticle;
