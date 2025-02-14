import { useEffect, useState } from "react";
import Block from "../UI/Block";
import { Review } from "../../Utils/Models/Review";
import ReviewComponent from "./ReviewComponent";
import AddReviewComponent from "./AddReviewComponent";
import { useAuth } from "../../Utils/Context/AuthContext";

interface CommentSectionProps {
  AiServiceId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ AiServiceId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user } = useAuth();

  useEffect(() => {
    /**
     * A function to fetch the reviews of the AI service.
     * It sends a GET request to the server to get the reviews of the AI service.
     * @async
     * @function fetchReviews
     * @returns {Promise<void>}
     */
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/getreviews/${AiServiceId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error(result);
        }

        if (result.data.some((review: Review) => review.UserId === user?.Id)) {
          setIsAlreadyReviewed(true);
        }

        setReviews(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [AiServiceId, user?.Id]);

  /**
   * function to handle the reviewed event after the user submits a review.
   * review is added to the reviews array and isAlreadyReviewed is set to true.
   *
   * @function handleReviewed
   * @param {Review} review
   * @returns {void}
   */
  const handleReviewed = (review: Review) => {
    setIsAlreadyReviewed(true);
    setReviews([...reviews, review]);
  };

  return (
    <Block
      direction="column"
      className="bg-[#252729] rounded-lg sm:w-2/3 p-2 gap-8 mx-auto pb-8 w-full "
    >
      {isLoading ? (
        <Block>Loading...</Block>
      ) : (
        <>
          <AddReviewComponent
            AiServiceId={AiServiceId}
            alreadyReviewed={isAlreadyReviewed}
            setReviewed={handleReviewed}
            userReview={
              isAlreadyReviewed
                ? reviews.find((review) => review.UserId === user?.Id)
                : undefined
            }
          />

          <div className="flex justify-between items-center px-3 py-2  rounded-md">
            <h2 className="font-extrabold text-2xl text-white">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </h2>
          </div>

          {reviews &&
            reviews.map((review) => (
              <ReviewComponent
                key={review.Id}
                Stars={review.Stars}
                CommentValue={review.CommentValue}
                id={review.Id}
                UserId={review.UserId}
                hasComments={review.HasReplies}
                likes={review.Likes}
                dislikes={review.Dislikes}
                createdAt={review.CreatedAt}
                setHasComments={() => {
                  reviews[reviews.indexOf(review)].HasReplies = true;
                }}
              ></ReviewComponent>
            ))}
        </>
      )}
    </Block>
  );
};

export default CommentSection;
