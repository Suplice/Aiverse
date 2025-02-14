import Block from "../UI/Block";
import TextField from "../UI/TextField";
import { Comment } from "../../Utils/Models/Comment";
import { useEffect, useMemo, useState } from "react";
import Controls from "./Controls";
import AddCommentComponent from "./AddCommentComponent";
import { User } from "../../Utils/Models/User";
import { Avatar } from "@mantine/core";
import { useAuth } from "../../Utils/Context/AuthContext";

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
  setHasComments: () => void;
  createdAt: Date;
}

const CommentComponent: React.FC<CommentProps> = ({
  Id,
  CommentValue,
  ReviewId,
  likes,
  dislikes,
  hasComments,
  UserId,
  createdAt,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyValue, setReplyValue] = useState<string>("");
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);

  const [commentUser, setCommentUser] = useState<User>();
  const { user } = useAuth();

  useEffect(() => {
    /**
     * A function to fetch the user details of the comment.
     * It sends a GET request to the server to get the user details of the comment.
     * @async
     * @function fetchUser
     * @returns {Promise<void>}
     */
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
        setCommentUser(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [UserId]);

  /**
   * A function to handle the reply button click event.
   * It toggles the `isReplying` state.
   * @function handleReplyClick
   * @returns {void}
   */
  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  /**
   * A function to handle the send button click event.
   * It sends a POST request to the server to add a reply to the comment.
   * @async
   * @function handleSendClick
   * @returns {Promise<void>}
   */
  const handleSendClick = async () => {
    try {
      setIsSendingReply(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/addComment`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            CommentValue: replyValue,
            UserId: user?.Id,
            ReviewId: ReviewId,
            ParentId: Id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
      } else {
        LoadComments();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSendingReply(false);
      setIsReplying(false);
    }
  };

  /**
   * A function to load the comments of the comment.
   * It sends a GET request to the server to get the comments of the comment.
   * @async
   * @function LoadComments
   * @returns {Promise<void>}
   */
  const LoadComments = async () => {
    try {
      setIsLoadingComments(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/GetCommentReplies/${Id}`,
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
      } else {
        setComments(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingComments(false);
      setIsShowingComments(true);
    }
  };

  /**
   * A memoized function to format the date of the comment.
   * It calculates the difference between the current date and the comment date and returns a formatted string.
   * @function date
   * @returns {string}
   */
  const date = useMemo(() => {
    console.log("formating");
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
  }, [createdAt]);

  return (
    <div className="grid grid-cols-[40px_auto] grid-rows-[40px_auto] mb-2 ">
      {commentUser ? (
        <Avatar name={commentUser.Name?.at(0) ?? "G"}></Avatar>
      ) : (
        <Avatar radius="xl"></Avatar>
      )}
      <Block direction="row" className="ml-3 " gap={3} align="center">
        <TextField color="white" className="text-lg">
          {commentUser?.Name ? commentUser?.Name : "Guest"}
        </TextField>
        <TextField className="text-sm text-gray-500">{date}</TextField>
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
        {isShowingComments ? (
          <>
            {comments.map(
              (comment) =>
                comment.ReviewId === ReviewId &&
                comment.ParentId === Id && (
                  <CommentComponent
                    key={comment.Id}
                    CommentValue={comment.CommentValue}
                    Id={comment.Id}
                    ParentId={Id}
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
    </div>
  );
};

export default CommentComponent;
