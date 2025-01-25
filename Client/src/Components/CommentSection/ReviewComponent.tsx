import { useEffect, useState } from "react";
import Block from "../UI/Block";
import TextField from "../UI/TextField";
import { TiStarFullOutline } from "react-icons/ti";
import BlockTextField from "../UI/BlockTextField";
import { Comment } from "../../Utils/Models/Comment";
import CommentComponent from "./CommentComponent";
import AddCommentComponent from "./AddCommentComponent";
import Controls from "./Controls";
import { User } from "../../Utils/Models/User";

interface ReviewComponentProps {
  key: number;
  Stars: number;
  CommentValue: string;
  id: number;
  UserId: number;
  hasComments: boolean;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  Stars,
  CommentValue,
  id,
  likes,
  dislikes,
  UserId,
  createdAt,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>("");
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/${UserId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error(result);
        }
        setUser(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    // TO DO: get user data and image from the server
    // TO DO: get all comments for review

    fetchUser();
  }, []);

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleSendClick = async () => {
    // TO DO: Send reply to the server
    setTimeout(() => {
      setIsSendingReply(false);
      setIsReplying(false);
    }, 2000);

    try {
      setIsSendingReply(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/addComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CommentValue: replyValue,
            UserId: user?.Id,
            ReviewId: id,
            ParentId: 0,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
      }

      LoadComments();

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSendingReply(false);
      setIsReplying(false);
    }
  };

  const formatDate = () => {
    const now = new Date();
    const diff = now.getTime() - new Date(createdAt).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
      return "a minute ago";
    } else if (minutes < 60) {
      if (minutes === 1) return `${minutes} minute ago`;
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      if (hours === 1) return `${hours} hour ago`;
      return `${hours} hours ago`;
    } else {
      if (days === 1) return `${days} day ago`;
      return `${days} days ago`;
    }
  };

  const LoadComments = async () => {
    setIsLoadingComments(true);
    setTimeout(() => {
      setIsLoadingComments(false);
      setIsShowingComments(true);
    }, 2000);

    try {
      setIsLoadingComments(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/getReviewComments/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      console.log(id);

      if (!response.ok) {
        console.error(result);
      }

      setComments(result.data);

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingComments(false);
      setIsShowingComments(true);
    }
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
          {user?.Name ? user?.Name : "Anonymous"}
        </TextField>
        <Block className="text-sm" direction="row" align="center" gap={1}>
          <TiStarFullOutline className="text-yellow-300" />
          <TextField color="white" className="text-sm text-yellow-100">
            {Stars}
          </TextField>
        </Block>
        <TextField className="text-sm text-gray-500">{formatDate()}</TextField>
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
            {isShowingComments ? (
              <>
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
              </>
            ) : isLoadingComments ? (
              <div className="w-8 h-8 border-4 border-white border-dotted rounded-full animate-spin ml-6"></div>
            ) : (
              <TextField
                value="Show Replies"
                color="white"
                className="ml-3 hover:underline cursor-pointer"
                onClick={LoadComments}
              />
            )}
          </Block>
        </Block>
      </Block>
    </div>
  );
};

export default ReviewComponent;
