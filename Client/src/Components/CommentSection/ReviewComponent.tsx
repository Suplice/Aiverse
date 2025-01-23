import { useEffect } from "react";
import Block from "../UI/Block";
import TextField from "../UI/TextField";
import { TiStarFullOutline } from "react-icons/ti";
import BlockTextField from "../UI/BlockTextField";
import { Comment } from "../../Utils/Models/Comment";

const MockComments: Comment[] = [
  {
    Id: 1,
    UserId: 1,
    ReviewId: 1,
    CommentValue: "This is a great service",
    ParentId: 0,
  },
  {
    Id: 2,
    UserId: 1,
    ReviewId: 1,
    CommentValue: "This is a great service",
    ParentId: 0,
  },
];

interface ReviewComponentProps {
  key: number;
  Stars: number;
  CommentValue: string;
  id: number;
  UserId: number;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({
  key,
  Stars,
  CommentValue,
  id,
  UserId,
}) => {
  useEffect(() => {
    // TO DO: get user data and image from the server
    // TO DO: get all comments for review
  }, []);

  return (
    <Block direction="row" className="gap-2 mb-4" justify="start">
      {/* Review section */}
      <Block direction="column" className="mt-1 w-10" align="center">
        <img
          src="https://placehold.co/400"
          alt="User"
          className="w-10 h-10 rounded-full"
        ></img>

        <div className="border-l h-full mt-1"></div>
      </Block>
      <Block direction="column" className="w-full">
        <Block direction="row" className="w-full ml-3 " gap={3} align="center">
          <TextField color="white" className="text-xl">
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

        <Block direction="row" className="w-full h-full">
          <Block className="w-full" direction="column" align="start">
            <BlockTextField
              className="w-full text-start text-xs font-thin"
              color="white"
            >
              {CommentValue}
            </BlockTextField>

            {MockComments.map((comment) => (
              <Block
                direction="column"
                className="mt-6  gap-2 relative z-10"
                key={comment.Id}
              >
                <Block direction="row" align="center" gap={2}>
                  <div className="absolute    border-gray-500 z-0"></div>
                  <img
                    src="https://placehold.co/400"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  ></img>
                  <TextField className="text-sm text-white">
                    User Name
                  </TextField>
                </Block>
                <Block direction="row">
                  <div className="border-l ml-5 w-5"></div>
                  <Block direction="column" className="p-2 rounded-lg w-fit">
                    <TextField className="text-xs text-gray-300 mt-1">
                      {comment.CommentValue}
                    </TextField>
                  </Block>
                </Block>
              </Block>
            ))}
          </Block>
        </Block>

        {/* Comments Section */}
      </Block>
    </Block>
  );
};

export default ReviewComponent;
