import { useEffect } from "react";
import Block from "../UI/Block";
import { Review } from "../../Utils/Models/Review";
import ReviewComponent from "./ReviewComponent";

interface CommentSectionProps {
  AiServiceId: number;
}

const MockReviews: Review[] = [
  {
    Id: 1,
    AiServiceId: 1,
    UserId: 1,
    Stars: 5,
    CommentValue:
      "Great Service Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service ",
  },
  {
    Id: 2,
    AiServiceId: 1,
    UserId: 2,
    Stars: 4,
    CommentValue:
      "Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service ",
  },
  {
    Id: 3,
    AiServiceId: 1,
    UserId: 3,
    Stars: 3,
    CommentValue:
      "Ok Service Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service  Good Service Good Service Good Service Good Service Good Service Good Service Good Service ",
  },
];

const CommentSection: React.FC<CommentSectionProps> = () => {
  useEffect(() => {
    // TO DO:
    // Fetch Reviews from the server
  }, []);

  return (
    <Block
      direction="column"
      className="bg-[#252729] rounded-lg p-2 gap-8 h-fit pb-8"
    >
      {MockReviews.map((review) => (
        <ReviewComponent
          key={review.Id}
          Stars={review.Stars}
          CommentValue={review.CommentValue}
          id={review.Id}
          UserId={review.UserId}
        ></ReviewComponent>
      ))}
    </Block>
  );
};

export default CommentSection;
