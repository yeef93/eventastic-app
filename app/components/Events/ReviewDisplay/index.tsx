import React from 'react';

interface Review {
  name: string;
  text: string;
}

interface ReviewDisplayProps {
  reviews: Review[];
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ reviews }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <p className="text-gray-700">{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewDisplay;
