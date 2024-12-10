// src/components/Article.jsx

import React, { useState } from 'react';
import AddArticleForm from './AddArticleForm'; // Ensure the correct path

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddArticle = (newArticle) => {
    setArticles([...articles, newArticle]);
    setShowForm(false); // Close the form after submission
  };

  return (
    <div className="mt-20 hide-scrollbar"> {/* Added hide-scrollbar class here */}
      <div className="flex justify-between items-center my-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl hide-scrollbar text-center">
          Articles
        </h2>
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
          <div className="bg-white p-6 rounded relative max-h-[80%] overflow-y-auto hide-scrollbar"> {/* Added hide-scrollbar class here */}
            <div className="flex justify-between items-center p-2 rounded-t">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-0.5 right-1.5 text-white bg-red-500 rounded p-1"
                aria-label="Close"
              >
                &times; {/* Close symbol */}
              </button>
              <h2 className="text-black">Add Article</h2>
            </div>
            <AddArticleForm onAddArticle={handleAddArticle} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 hide-scrollbar"> {/* Added hide-scrollbar class here */}
        {articles.map((article, index) => (
          <div key={index} className="border rounded p-4 shadow-md">
            {article.image && (
              <img src={URL.createObjectURL(article.image)} alt="Article" className="mb-2" />
            )}
            <h3 className="text-xl font-bold">{article.title}</h3>
            <p className="text-gray-600">By {article.author}</p>
            <p className="text-gray-500">{article.date}</p>
            <p className="mt-2">{article.content}</p>
            <p className="mt-2 text-sm text-gray-500">Category: {article.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;