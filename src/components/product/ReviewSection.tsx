"use client";

import { useState } from "react";
import Image from "next/image";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";

export interface Review {
  id: string;
  user: {
    name: string;
    image?: string;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  averageRating?: number;
}

const ReviewSection = ({ reviews, averageRating = 0 }: ReviewSectionProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<
    "newest" | "highest" | "lowest" | "helpful"
  >("newest");

  // Calculate average rating if not provided
  const calculatedAverage =
    averageRating ||
    (reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0);

  // Get rating distribution
  const ratingCounts = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Toggle review form
  const toggleReviewForm = () => {
    setShowReviewForm((prev) => !prev);
  };

  // Render stars for a given rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <StarIconSolid className="h-5 w-5 text-yellow-400" />
            ) : (
              <StarIconOutline className="h-5 w-5 text-gray-300" />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {calculatedAverage.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(calculatedAverage))}
              </div>
              <p className="text-sm text-gray-500">
                Based on {reviews.length} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2 mt-6">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating] || 0;
                const percentage =
                  reviews.length > 0
                    ? Math.round((count / reviews.length) * 100)
                    : 0;

                return (
                  <div key={rating} className="flex items-center text-sm">
                    <div className="w-12">{rating} star</div>
                    <div className="flex-1 mx-3">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-9 text-right text-gray-500">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={toggleReviewForm} className="w-full">
              Write a Review
            </Button>
          </div>
        </div>

        <div className="md:w-2/3">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </h3>
            <div className="flex items-center">
              <label
                htmlFor="sort-reviews"
                className="text-sm text-gray-500 mr-2"
              >
                Sort by:
              </label>
              <select
                id="sort-reviews"
                className="text-sm border border-gray-300 rounded p-1"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "newest"
                      | "highest"
                      | "lowest"
                      | "helpful"
                  )
                }
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      {/* User Image or Placeholder */}
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                        {review.user.image ? (
                          <Image
                            src={review.user.image}
                            alt={review.user.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold">
                            {review.user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {review.user.name}
                        </p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>

                    {review.verified && (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Verified Purchase
                      </div>
                    )}
                  </div>

                  <div className="mb-2">{renderStars(review.rating)}</div>

                  <h4 className="font-medium text-gray-900 mb-2">
                    {review.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{review.comment}</p>

                  <div className="flex items-center text-sm">
                    <button className="text-gray-500 hover:text-gray-700 flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No reviews yet</p>
                <Button onClick={toggleReviewForm}>
                  Be the first to review
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {reviews.length > 5 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-primary-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Write a Review
          </h3>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="review-rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-gray-300 hover:text-yellow-400"
                  >
                    <StarIconOutline className="h-7 w-7" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="review-title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Review Title
              </label>
              <input
                type="text"
                id="review-title"
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Summarize your review"
              />
            </div>

            <div>
              <label
                htmlFor="review-comment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Review
              </label>
              <textarea
                id="review-comment"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="What did you like or dislike? What did you use this product for?"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </Button>
              <Button>Submit Review</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
