import Block from "../UI/Block";
import TextField from "../UI/TextField";
import { Comment } from "../../Utils/Models/Comment";
import { useEffect, useState } from "react";
import Controls from "./Controls";
import AddCommentComponent from "./AddCommentComponent";

const MockComments: Comment[] = [
  {
    Id: 10,
    UserId: 1,
    ReviewId: 2,
    CommentValue: "Under Comment to Review 2 and Parent 0",
    ParentId: 1,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
  },
  {
    Id: 12,
    UserId: 1,
    ReviewId: 2,
    CommentValue: "Under Comment to Review 2 and Parent 3",
    ParentId: 2,
    HasComments: false,
    Likes: 0,
    Dislikes: 0,
  },
  {
    Id: 13,
    UserId: 1,
    ReviewId: 2,
    CommentValue: "Under Comment to Review 2 and Parent 3",
    ParentId: 12,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
  },
  {
    Id: 14,
    UserId: 1,
    ReviewId: 2,
    CommentValue: "Under Comment to Review 2 and Parent 3 ",
    ParentId: 13,
    HasComments: true,
    Likes: 0,
    Dislikes: 0,
  },
];

interface CommentProps {
  Id: number;
  CommentValue: string;
  UserId: number;
  ReviewId: number;
  ParentId: number;
  key: number;
  hasComments: boolean;
  likes: number;
  dislikes: number;
}

const CommentComponent: React.FC<CommentProps> = ({
  Id,
  CommentValue,
  ReviewId,
  likes,
  dislikes,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>("");
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);
  useEffect(() => {
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
    <div className="grid grid-cols-[40px_auto] grid-rows-[40px_auto] mb-2 ">
      <img
        src="https://placehold.co/400"
        alt="User"
        className="w-9/12 rounded-full self-center place-self-center"
      ></img>
      <Block direction="row" align="center" gap={2}>
        <TextField className="text-sm text-white">User Name</TextField>
      </Block>
      <div className="border-l h-full mt-1 self-center place-self-center border-gray-600"></div>
      <Block
        direction="column"
        className=" gap-2  z-10 "
        align="start"
        justify="start"
        key={Id}
      >
        <TextField className="text-xs text-gray-300 mt-1 text-start">
          {CommentValue}
        </TextField>

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

        {comments.map((comment) => {
          if (comment.ReviewId === ReviewId && comment.ParentId === Id) {
            return (
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
            );
          }
        })}
      </Block>
    </div>
  );
};

export default CommentComponent;
