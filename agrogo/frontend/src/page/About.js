import React from 'react'
import Header from '../components/Header'
import { useState } from "react";


const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      const newReview = { id: Date.now(), name, rating, comment };
      setReviews([newReview, ...reviews]); // Add new review at the top
      setName("");
      setRating(5);
      setHover(0);
      setComment("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
      
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Star Rating */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                (hover || rating) >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave one!</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {reviews.map((review) => (
              <li key={review.id} className="p-3 border rounded">
                <strong>{review.name}</strong> -{" "}
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  <span className="text-gray-300">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </span>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
