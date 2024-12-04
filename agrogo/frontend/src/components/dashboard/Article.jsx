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
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10">
        Articles
      </h2>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Article
      </button>

      {/* Modal for AddArticleForm */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6 w-11/12 md:w-1/3 max-h-[90vh] overflow-y-auto">
            <AddArticleForm onAddArticle={handleAddArticle} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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