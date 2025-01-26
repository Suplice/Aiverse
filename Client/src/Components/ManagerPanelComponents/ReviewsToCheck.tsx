import { useState } from "react";

interface Review {
  id: number;
  title: string;
  description: string;
  status: "pending" | "accepted" | "denied";
}

const ReviewsToCheck = () => {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, title: "Review 1", description: "Details of Review 1", status: "pending" },
    { id: 2, title: "Review 2", description: "Details of Review 2", status: "pending" },
    { id: 3, title: "Review 3", description: "Details of Review 3", status: "accepted" },
  ]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleAccept = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: "accepted" } : review
      )
    );
    setSelectedReview(null);
  };

  const handleDeny = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, status: "denied" } : review
      )
    );
    setSelectedReview(null);
  };

  return (
    <div className="p-4 bg-[#1E1E1E] rounded shadow-md w-3/4 text-white">
      <h2 className="text-2xl font-bold mb-4">Reviews to Check</h2>

      {selectedReview ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{selectedReview.title}</h3>
          <p className="text-gray-400">{selectedReview.description}</p>
          <div className="space-x-2">
            <button
              onClick={() => handleAccept(selectedReview.id)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Accept
            </button>
            <button
              onClick={() => handleDeny(selectedReview.id)}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-200"
            >
              Deny
            </button>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {reviews
            .filter((review) => review.status === "pending")
            .map((review) => (
              <li
                key={review.id}
                className="flex items-center justify-between bg-[#2C2C2C] p-3 rounded"
              >
                <span className="text-lg text-white">{review.title}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => setSelectedReview(review)}
                    className="px-4 py-2 bg-[#444444] text-white rounded hover:bg-[#555555] transition duration-200"
                  >
                    View
                  </button>
                  <span className="text-sm font-semibold text-gray-400">
                    Pending
                  </span>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsToCheck;
