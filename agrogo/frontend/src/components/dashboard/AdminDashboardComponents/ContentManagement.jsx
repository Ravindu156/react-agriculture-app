import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Article.css'; // Assuming your styles are here

const ContentManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles/approved');
        setArticles(response.data); // Set the approved articles in state
      } catch (error) {
        console.error('Error fetching approved articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedArticles();
  }, []);

  return (
    <div id="ContentManagement" className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center">Content Management</h2>

      {loading ? (
        <p className="text-center mt-5">Loading articles...</p>
      ) : articles.length > 0 ? (
        <div className="mt-10 article-grid">
          {articles.map((article) => (
            <div key={article._id} className="article-card p-4 border rounded shadow">
              {/* Check if article has an image and ensure the path is correctly formatted */}
              {article.image && (
                <img
                  src={`http://localhost:5000/${article.image}`} // Ensure image URL is correct, considering backend setup
                  alt={article.title} // Set alt text dynamically
                  className="article-image mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-gray-700">{article.content}</p>
              <p className="text-gray-500 mt-3">By {article.author} | {article.date}</p>
              <p className="category">Category: {article.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">No approved articles available.</p>
      )}
    </div>
  );
};

export default ContentManagement;
