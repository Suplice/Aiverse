import { useEffect, useState } from "react";
import Block from "../UI/Block";
import { Review } from "../../Utils/Models/Review";
import ReviewComponent from "./ReviewComponent";
import AddReviewComponent from "./AddReviewComponent";

interface CommentSectionProps {
  AiServiceId: number;
}

const MockReviews: Review[] = [
  {
    Id: 1,
    AiServiceId: 1,
    HasComments: false,
    UserId: 1,
    Likes: 0,
    Dislikes: 0,
    Stars: 5,
    CommentValue:
      "Great Service Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service ",
  },
  {
    Id: 2,
    AiServiceId: 1,
    UserId: 2,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
    Stars: 4,
    CommentValue:
      "Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service ",
  },
  {
    Id: 3,
    AiServiceId: 1,
    UserId: 3,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
    Stars: 3,
    CommentValue:
      "Ok Service Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service ",
  },
];

const CommentSection: React.FC<CommentSectionProps> = ({ AiServiceId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    try {
      setReviews(MockReviews);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Block direction="column" className="bg-[#252729]   p-2 gap-8  pb-8">
      <AddReviewComponent AiServiceId={AiServiceId} />
      {reviews &&
        reviews.map((review) => (
          <ReviewComponent
            key={review.Id}
            Stars={review.Stars}
            CommentValue={review.CommentValue}
            id={review.Id}
            UserId={review.UserId}
            hasComments={true}
            likes={review.Likes}
            dislikes={review.Dislikes}
          ></ReviewComponent>
        ))}
    </Block>
  );
};

export default CommentSection;
