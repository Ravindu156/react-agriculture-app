import React, { useState, useEffect } from 'react';
import AddArticleForm from './AddArticleForm'; // Ensure the correct path
import axios from 'axios';
import './Article.css'; // Import the CSS file

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch all articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles/getArticles');
        setArticles(response.data); // Set the fetched articles in state
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleAddArticle = (newArticle) => {
    setArticles([...articles, newArticle]);
    setShowForm(false); // Close the form after submission
  };

  return (
    <div id="articles" className="mt-20 hide-scrollbar">
      <div className="flex justify-center items-center my-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center">Articles</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white p-2 rounded relative"
          onMouseOver={(e) => e.currentTarget.setAttribute('title', 'Add Article')}
        >
          +
        </button>
      </div>

      {/* Modal for AddArticleForm */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded relative max-h-[80%] overflow-y-auto">
            <div className="flex justify-between items-center p-2 rounded-t">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-0.5 right-1.5 text-white bg-red-500 rounded p-1"
                aria-label="Close"
              >
                &times; {/* Close symbol */}
              </button>
            </div>
            <AddArticleForm onAddArticle={handleAddArticle} />
          </div>
        </div>
      )}

      <div className="article-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.image && (
              <img
                src={`http://localhost:5000${article.image}`} // Use the full URL for the image
                alt="Article"
                className="article-image"
              />
            )}
            <div className="article-info">
              <h3 className="article-title">{article.title}</h3>
              <p className="author">By {article.author}</p>
              <p className="date">{article.date}</p>
              <div className="article-content">
                <p>{article.content}</p>
                <p className="category">Category: {article.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
