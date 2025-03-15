import { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/Header'

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Fetch reviews from backend
    axios.get("http://localhost:5000/api/reviews")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && comment) {
      const newReview = { name, rating, comment };

      try {
        const response = await axios.post("http://localhost:5000/api/reviews", newReview);
        setReviews([response.data, ...reviews]); // Update state
        setName("");
        setRating(5);
        setHover(0);
        setComment("");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-10  rounded-xl shadow-lg">
        <div className="mt-12">
          <h2 className="text-4xl font-semibold text-center text-brown-800 mb-6">Share Your Thoughts</h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
            <input
              type="text"
              className="w-full p-4 border-2 border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Star Rating */}
            <div className="flex justify-left space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-3xl ${ (hover || rating) >= star ? "text-yellow-600" : "text-gray-400" }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="w-full p-4 border-2 border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Submit Review
            </button>
          </form>

          {/* Display Reviews */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-brown-800">What Customers Are Saying</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500 mt-4">No reviews yet. Be the first to share your experience!</p>
            ) : (
              <ul className="mt-4 space-y-6">
                {reviews.map((review) => (
                  <li key={review._id} className="p-6 bg-gray-50 rounded-lg shadow-md border border-brown-200">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-xl text-brown-700">{review.name}</strong>
                      <span className="text-yellow-600">
                        {"★".repeat(review.rating)}
                        <span className="text-gray-400">
                          {"★".repeat(5 - review.rating)}
                        </span>
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
