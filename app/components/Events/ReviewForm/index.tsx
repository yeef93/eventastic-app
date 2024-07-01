import React, { useState } from "react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleReviewChange = (value) => {
    setReview(value);
  };

  const handleSubmit = (e) => {
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
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold">Add a Review</h2>
        </div>
        <div className="flex mb-4">
          <Image
            src="/path-to-profile-image.jpg" // Replace with the actual path to the profile image
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full mr-4"
          />
          <div className="flex-1">
            <ReactQuill
              value={review}
              onChange={handleReviewChange}
              placeholder="Add your Review here..."
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline'],
                  [{ 'align': [] }],
                  ['link', 'image']
                ],
              }}
            />
          </div>
        </div>
        <div className="mb-4 pl-10">
          <select
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value={0} disabled>Select a rating</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;