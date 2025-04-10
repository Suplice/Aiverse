import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Context/AuthContext";
import Block from "../UI/Block";
import Button from "../UI/Button";

interface AddCommentComponentProps {
  replyValue: string;
  setReplyValue: (value: string) => void;
  handleReplyClick: () => void;
  handleSendClick: () => void;
  isSendingReply: boolean;
}

const AddCommentComponent: React.FC<AddCommentComponentProps> = ({
  replyValue,
  setReplyValue,
  handleReplyClick,
  handleSendClick,
  isSendingReply,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <Block
      direction="column"
      className="text-white bg-gray-800 p-4 rounded-lg shadow-lg sm:w-[400px] w-full relative  "
      gap={4}
    >
      {!user && (
        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center rounded-lg shadow-2xl backdrop-blur-sm">
          <div className="text-center p-8 bg-gray-900 bg-opacity-90  rounded-xl shadow-lg mx-4">
            <p className="text-gray-300 text-xl font-semibold mb-6">
              You need to be logged in to comment.
            </p>
            <Button
              value="Log In"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium text-sm rounded-lg hover:from-blue-600 hover:to-teal-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                navigate("/auth/signin");
              }}
            />
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold ">Reply to comment</h3>
      <textarea
        value={replyValue}
        placeholder="Write your reply here..."
        className="bg-gray-700 resize-none rounded-md outline-none p-3 sm:w-full  h-[120px]  border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-300 transition-all duration-200"
        onChange={(e) => setReplyValue(e.target.value)}
        disabled={isSendingReply}
      ></textarea>
      <Block direction="row" gap={4} align="center" justify="end">
        <Button
          value="Cancel"
          className="text-gray-800 bg-gray-300 rounded-md px-4 py-2 hover:bg-gray-400 transition-all duration-200"
          onClick={handleReplyClick}
          disabled={isSendingReply}
        />
        <Button
          value={isSendingReply ? "Sending..." : "Send"}
          className={`${
            isSendingReply ? "bg-blue-500" : "bg-blue-600"
          } text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200`}
          onClick={handleSendClick}
          disabled={isSendingReply}
        />
      </Block>
    </Block>
  );
};

export default AddCommentComponent;
