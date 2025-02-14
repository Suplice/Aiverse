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
import { Avatar } from "@mantine/core";
import { useAuth } from "../../Utils/Context/AuthContext";

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
  setHasComments: () => void;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  Stars,
  CommentValue,
  id,
  likes,
  dislikes,
  UserId,
  createdAt,
  hasComments,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>("");
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);
  const [reviewUser, setReviewUser] = useState<User>();
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/${UserId}`,
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
        setReviewUser(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const handleSendClick = async () => {
    try {
      setIsSendingReply(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/addComment`,
        {
          method: "POST",
          credentials: "include",
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
    } catch (error) {
      console.error(error);
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
    try {
      setIsLoadingComments(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/getReviewComments/${id}`,
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

      setComments(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingComments(false);
      setIsShowingComments(true);
    }
  };

  return (
    <div className="grid grid-cols-[40px_auto] grid-rows-[40px_auto]  ">
      {reviewUser ? (
        <Avatar name={reviewUser.Name?.at(0) ?? "G"}></Avatar>
      ) : (
        <Avatar radius="xl"></Avatar>
      )}
      <Block direction="row" className="ml-3 " gap={3} align="center">
        <TextField color="white" className="text-lg">
          {reviewUser?.Name ? reviewUser?.Name : "Guest"}
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
                        ParentId={id}
                        ReviewId={comment.ReviewId}
                        UserId={comment.UserId}
                        hasComments={comment.HasReplies}
                        likes={comment.Likes}
                        dislikes={comment.Dislikes}
                        setHasComments={() => {
                          comments[comments.indexOf(comment)].HasReplies = true;
                        }}
                        createdAt={comment.CreatedAt}
                      ></CommentComponent>
                    )
                )}
              </>
            ) : isLoadingComments ? (
              <div className="w-8 h-8 border-4 border-white border-dotted rounded-full animate-spin ml-6"></div>
            ) : hasComments ? (
              <TextField
                value="Show Replies"
                color="white"
                className="ml-3 hover:underline cursor-pointer"
                onClick={LoadComments}
              />
            ) : null}
          </Block>
        </Block>
      </Block>
    </div>
  );
};

export default ReviewComponent;
