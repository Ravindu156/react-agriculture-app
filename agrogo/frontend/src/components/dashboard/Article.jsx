import React, { useState, useEffect } from 'react';
import AddArticleForm from './AddArticleForm'; // Ensure the correct path
import axios from 'axios';
import './Article.css'; // Import the CSS file

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem('user')); // Replace with your auth mechanism
  const role = user?.role || 'guest';

  // //Fetch all articles from the backend
  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/articles/getArticles');
  //       setArticles(response.data); // Set the fetched articles in state
  //     } catch (error) {
  //       console.error('Error fetching articles:', error);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

//Fetch admin aproved articles from the backend
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
}, []); // Get approved articles


  // // Get admin aprove articles
  // useEffect(() => {
  //   const fetchApprovedArticles = async () => {
  //     try {
  //       // Fetch approved articles from the backend
  //       const response = await axios.get('http://localhost:5000/api/articles/approved');
  //       setArticles(response.data); // Set the approved articles in the state
  //     } catch (error) {
  //       console.error('Error fetching approved articles:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchApprovedArticles();
  // }, []);


  const handleApproveArticle = async (id) => {
    try {
      // Make PUT request to approve the article
      const response = await axios.put(`http://localhost:5000/api/articles/approve/${id}`);
      // Update the article list to reflect the approval
      setArticles(articles.map(article => 
        article._id === id ? { ...article, isApproved: true } : article
      ));
    } catch (error) {
      console.error('Error approving article:', error);
    }
  };



  const handleAddArticle = (newArticle) => {
    setArticles([...articles, newArticle]);
    setShowForm(false); // Close the form after submission
  };


  


  return (
    <div id="articles" className="mt-20 hide-scrollbar custom-padding" >
      <div className="flex justify-center items-center my-10 custom-padding">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center " >Articles</h2>
        
        
 {role === 'Agricultural Executive Officer' && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white p-2 rounded-full absolute right-20 transform -translate-y-1/2 "
          onMouseOver={(e) => e.currentTarget.setAttribute('title', 'Add Article')}
        >
          Add Articles
        </button>
         )}
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
