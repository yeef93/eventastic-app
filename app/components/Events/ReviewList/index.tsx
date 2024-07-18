import React, { useEffect, useState } from "react";
import { StarIcon as FilledStarIcon } from "@heroicons/react/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/outline";

type Review = {
  id: number;
  reviewer: string;
  event: string;
  organizer: string;
  reviewMsg: string;
  rating: number;
  submitDate: string;
};

type ReviewListProps = {
  eventId: number;
};

const ReviewList: React.FC<ReviewListProps> = ({ eventId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${apiUrl}/events/${eventId}/reviews`);
        const data = await response.json();

        if (response.ok) {
          setReviews(data.data.events);
        } else {
          setError(data.statusMessage || "Failed to fetch reviews.");
        }
      } catch (error) {
        setError("Failed to fetch reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [eventId, apiUrl]);

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FilledStarIcon key={i} className="h-5 w-5 text-yellow-500 inline" />
        ) : (
          <OutlineStarIcon key={i} className="h-5 w-5 text-yellow-500 inline" />
        )
      );
    }
    return stars;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Event Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-4">
              <div className="border-b border-gray-200 pb-4">
                <p className="text-lg font-semibold">{review.reviewer}</p>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-500">
                    {review.rating} / 5
                  </span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: review.reviewMsg }}
                  className="text-gray-700 mt-2 mb-2"
                />
                <p className="text-sm text-gray-500">
                  {formatDate(review.submitDate)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
