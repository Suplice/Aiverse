import React, { useState } from "react";
import Block from "../UI/Block";
import Button from "../UI/Button";
import { useAuth } from "../../Utils/Context/AuthContext";

interface AddReviewComponentProps {
  AiServiceId: number;
}

const AddReviewComponent: React.FC<AddReviewComponentProps> = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user } = useAuth();

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/AddReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AiServiceId: 7,
            Stars: rating,
            CommentValue: comment,
            UserId: user?.Id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Block
      direction="column"
      className="p-4 bg-gray-800 rounded-lg shadow-md m-4"
    >
      <h2 className="text-lg font-semibold text-white mb-2">Add your review</h2>

      <div className="flex items-center gap-1 mb-4 justify-end">
        {Array.from({ length: 5 }).map((_, index) => {
          const starIndex = index + 1;
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={starIndex <= (hoverRating || rating) ? "#ffc107" : "none"}
              stroke="#ffc107"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-6 h-6 cursor-pointer"
              onClick={() => handleStarClick(starIndex)}
              onMouseEnter={() => handleStarHover(starIndex)}
              onMouseLeave={handleStarMouseLeave}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          );
        })}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your own review here..."
        className="outline-none m-2 bg-gray-700 text-white resize-none h-[100px] p-2 rounded-lg border border-gray-600 focus:border-blue-500"
      ></textarea>

      <div className="flex justify-end mt-4 gap-4">
        <Button
          value={isSubmitting ? "Adding..." : "Add Review"}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleSubmit}
        ></Button>
      </div>
    </Block>
  );
};

export default AddReviewComponent;
