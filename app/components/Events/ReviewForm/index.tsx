import React, { useState } from "react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const ReviewForm = ({ onSubmit }:any) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingClick = (ratingValue:any) => {
    setRating(ratingValue);
  };

  const handleReviewChange = (value:any) => {
    setReview(value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (rating && review) {
      onSubmit({ rating, review });
      setRating(0);
      setReview("");
    } else {
      alert("Please provide both a rating and a comment.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold">Submit Your Review</h2>
        </div>
        <div className="mb-4 text-left">
          <h3 className="text-sm font-medium mb-2">Add Your Rating *</h3>
          <div className="flex items-start justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 cursor-pointer ${
                  star <= (hoverRating || rating) ? "text-yellow-500" : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRatingClick(star)}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex-1">
            <ReactQuill
              value={review}
              onChange={handleReviewChange}
              placeholder="Add your Review here..."
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link", "image"],
                ],
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;