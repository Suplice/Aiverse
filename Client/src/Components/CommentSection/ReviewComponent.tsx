import { useEffect, useState } from "react";
import Block from "../UI/Block";
import TextField from "../UI/TextField";
import { TiStarFullOutline } from "react-icons/ti";
import BlockTextField from "../UI/BlockTextField";
import { Comment } from "../../Utils/Models/Comment";
import CommentComponent from "./CommentComponent";
import AddCommentComponent from "./AddCommentComponent";
import Controls from "./Controls";

const MockComments: Comment[] = [
  {
    Id: 1,
    UserId: 1,
    ReviewId: 2,
    CommentValue: "Comment to reviewId 2   ",
    ParentId: 0,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
  },
  {
    Id: 2,
    UserId: 1,
    ReviewId: 2,
    CommentValue: "Comment to reviewId 2   ",
    ParentId: 0,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
  },
  {
    Id: 3,
    UserId: 1,
    ReviewId: 1,
    CommentValue: "Comment to reviewId 2   ",
    ParentId: 0,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
  },
  {
    Id: 4,
    UserId: 1,
    ReviewId: 3,
    CommentValue: "Comment to reviewId 2   ",
    ParentId: 0,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
  },
];

interface ReviewComponentProps {
  key: number;
  Stars: number;
  CommentValue: string;
  id: number;
  UserId: number;
  hasComments: boolean;
  likes: number;
  dislikes: number;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  Stars,
  CommentValue,
  id,
  likes,
  dislikes,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>("");
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);

  useEffect(() => {
    // TO DO: get user data and image from the server
    // TO DO: get all comments for review
    setComments(MockComments);
  }, []);

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleSendClick = () => {
    setIsSendingReply(true);
    // TO DO: Send reply to the server
    setTimeout(() => {
      setIsSendingReply(false);
      setIsReplying(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-[40px_auto] grid-rows-[40px_auto]  ">
      <img
        src="https://placehold.co/400"
        alt="User"
        className="w-9/12 rounded-full self-center place-self-center"
      ></img>
      <Block direction="row" className="ml-3 " gap={3} align="center">
        <TextField color="white" className="text-lg">
          User Name
        </TextField>
        <Block className="text-sm" direction="row" align="center" gap={1}>
          <TiStarFullOutline className="text-yellow-300" />
          <TextField color="white" className="text-sm text-yellow-100">
            {Stars}
          </TextField>
        </Block>
        <TextField className="text-sm text-gray-500">1 day ago</TextField>
      </Block>
      <div className="border-l h-full mt-1 self-center place-self-center border-gray-600"></div>

      <Block direction="column" className="w-full ">
        <Block direction="row" className="w-full h-full">
          <Block className="w-full" direction="column" align="start">
            <BlockTextField
              className="w-full text-start text-xs font-thin"
              color="white"
            >
              {CommentValue}
            </BlockTextField>

            <Controls
              likes={likes}
              dislikes={dislikes}
              handleReplyClick={handleReplyClick}
            />

            {isReplying && (
              <AddCommentComponent
                replyValue={replyValue}
                setReplyValue={setReplyValue}
                handleReplyClick={handleReplyClick}
                handleSendClick={handleSendClick}
                isSendingReply={isSendingReply}
              />
            )}

            {comments.map(
              (comment) =>
                comment.ReviewId === id && (
                  <CommentComponent
                    key={comment.Id}
                    CommentValue={comment.CommentValue}
                    Id={comment.Id}
                    ParentId={comment.ParentId}
                    ReviewId={comment.ReviewId}
                    UserId={comment.UserId}
                    hasComments={comment.HasComments}
                    likes={comment.Likes}
                    dislikes={comment.Dislikes}
                  ></CommentComponent>
                )
            )}
          </Block>
        </Block>
      </Block>
    </div>
  );
};

export default ReviewComponent;
