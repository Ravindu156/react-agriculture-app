// src/components/AddArticleForm.jsx

import React, { useState } from 'react';

const AddArticleForm = ({ onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      title,
      author,
      date,
      category,
      content,
      image,
    };
    onAddArticle(newArticle);
    // Reset form fields
    setTitle('');
    setAuthor('');
    setDate('');
    setCategory('');
    setContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Add Article</h2>
      <div className="mb-4">
        <label className="block mb-1">Title of the Article:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Author's Name:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="border rounded w-full p-2"
          rows="4"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border rounded w-full p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Article
      </button>
    </form>
  );
};

export default AddArticleForm;