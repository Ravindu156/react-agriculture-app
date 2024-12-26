import React, { useState } from 'react';
import axios from 'axios';

const AddArticleForm = ({ onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = new FormData();
    newArticle.append('title', title);
    newArticle.append('author', author);
    newArticle.append('date', date);
    newArticle.append('category', category);
    newArticle.append('content', content);
    newArticle.append('image', image); // Append the image file

    try {
      const response = await axios.post('http://localhost:5000/api/articles/addArticle', newArticle, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Article added:', response.data);
      setTitle('');
      setAuthor('');
      setDate('');
      setCategory('');
      setContent('');
      setImage(null);
      document.getElementById('image-input').value = ''; // Reset file input
      setMessage('Article added successfully!');
    } catch (error) {
      console.error('Error adding article:', error);
      setMessage('Error adding article. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4 text-center">Add Article</h2>
      {message && <div className="text-red-500 mt-2">{message}</div>}

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
          id="image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded w-full p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Add Article
      </button>
    </form>
  );
};

export default AddArticleForm;
