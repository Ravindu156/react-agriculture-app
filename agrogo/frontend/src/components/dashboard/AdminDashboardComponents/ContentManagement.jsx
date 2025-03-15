import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Article.css'; // Assuming your styles are here

const ContentManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
    
      if (!token) {
        console.error('No token found, authorization denied'); // Improved error message
        setLoading(false);
        return;
      }
    
      try {
        console.log('Token being sent:', token); // Debugging - Check token value
    
        const response = await axios.get('http://localhost:5000/api/articles/getArticles', {
          headers: {
            Authorization: `Bearer ${token.trim()}`, // Ensure no spaces in token
          },
        });
    
        setArticles(response.data); // Set the fetched articles in state
        
      } catch (error) {
        console.error('Error fetching articles:', error.response?.data || error.message); // Improved error handling
      } finally {
        setLoading(false); // Set loading to false after the request is done
      }
    };
    
    fetchArticles();
  }, []); // Empty dependency array ensures this runs only once when the component mounts


  // Toggle admin approval status
  const toggleApproval = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, authorization denied');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/articles/toggleApproval/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update article state
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === id ? { ...article, adminApproval: !article.adminApproval } : article
        )
      );

      
    } catch (error) {
      console.error('Error toggling approval:', error.response?.data || error.message);
    }
  };


  return (
    <div id="ContentManagement" className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center">Article Management</h2>

      {loading ? (
        <p className="text-center mt-5">Loading articles...</p>
      ) : articles.length > 0 ? (
        <div className="mt-10 article-grid">
          {articles.map((article) => (
            <div key={article._id} className="article-card p-4 border rounded shadow">
              {/* Check if article has an image and ensure the path is correctly formatted */}
              {article.image && (
                <img
                  src={`http://localhost:5000${article.image}`} // Ensure image URL is correct, considering backend setup
                  alt={article.title} // Set alt text dynamically
                  className="article-image mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-gray-700">{article.content}</p>
              <p className="text-gray-500 mt-3">By {article.author} | {article.date}</p>
              <p className="category">Category: {article.category}</p>
              <button
                className={`mt-3 p-2 rounded ${
                  article.adminApproval ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
                onClick={() => toggleApproval(article._id)}
              >
                {article.adminApproval ? 'Approved ✅' : 'Not Approved ❌'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">No  articles available.</p>
      )}
    </div>
  );
};

export default ContentManagement;
