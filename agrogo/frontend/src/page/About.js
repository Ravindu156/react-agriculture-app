import { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/Header';

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 bg-fixed">
      <Header />
      
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 -mr-20 -mt-20"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-emerald-400 rounded-full opacity-20 -ml-40 -mb-40"></div>
      
      <div className="max-w-4xl mx-auto px-4 py-16 relative">
        {/* Page Title with Icon */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <svg className="w-16 h-16 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-800">Customer Reviews</h1>
          <p className="text-gray-600 mt-2">Share your experience and see what others are saying</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="20" cy="20" r="8" fill="#000"></circle>
              </pattern>
              <rect width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
          </div>

          {/* Review Form Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-8 text-white relative overflow-hidden">
            {/* Decorative Icons */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="absolute left-4 top-4 w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
              <svg className="absolute right-12 bottom-8 w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
              </svg>
              <svg className="absolute left-1/2 top-1/4 w-20 h-20 transform -translate-x-1/2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
              </svg>
            </div>

            <div className="relative">
              <h2 className="text-4xl font-bold text-center mb-2 flex items-center justify-center">
                <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
                Share Your Experience
              </h2>
              <p className="text-center text-emerald-100 mb-6">We value your feedback!</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    <input
                      type="text"
                      className="w-full p-4 border-2 border-transparent bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-gray-800"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col items-center my-6">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-white">Your Rating</span>
                    </div>
                    <div className="flex justify-center space-x-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`cursor-pointer text-4xl transition-all duration-200 transform hover:scale-110 ${(hover || rating) >= star ? "text-yellow-400" : "text-gray-300"}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                    </svg>
                    <textarea
                      className="w-full p-4 border-2 border-transparent bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-gray-800 min-h-32"
                      placeholder="Tell us about your experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-yellow-500 text-gray-900 font-bold px-6 py-4 rounded-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Display Reviews Section */}
          <div className="p-8 relative">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-emerald-200 pb-4 flex items-center">
              <svg className="w-8 h-8 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
              Customer Testimonials
            </h3>
            
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                </svg>
                <p className="text-gray-500 text-lg italic">No reviews yet. Be the first to share your experience!</p>
                <div className="mt-4">
                  <svg className="w-12 h-12 mx-auto text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </div>
              </div>
            ) : (
              <ul className="space-y-8">
                {reviews.map((review) => (
                  <li key={review._id} className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-emerald-600 text-white p-6 md:w-48 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 text-xl font-bold mb-2 ring-4 ring-emerald-300">
                          {review.name.charAt(0)}
                        </div>
                        <strong className="text-lg">{review.name}</strong>
                        <div className="mt-2 text-yellow-400 text-xl flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < review.rating ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 md:flex-1 relative">
                        <svg className="absolute top-4 left-4 w-8 h-8 text-emerald-200 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-gray-700 italic pl-10 pt-4">{`"${review.comment}"`}</p>
                        <div className="mt-4 text-xs text-gray-400 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                          </svg>
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Decorative Footer */}
        <div className="mt-16 text-center text-gray-500 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          Verified Reviews
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;