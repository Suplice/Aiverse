import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import Block from "../UI/Block";
import TextField from "../UI/TextField";

interface ControlsProps {
  likes: number;
  dislikes: number;
  handleReplyClick: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  likes,
  dislikes,
  handleReplyClick,
}) => {
  return (
    <Block className=" mt-2 mb-2" direction="row" gap={4} align="center">
      <Block direction="row" align="center" gap={2} className="">
        <FaThumbsUp
          size={12}
          className="text-gray-300 hover:text-green-500  transition-all duration-200 cursor-pointer"
        />
        <TextField className="text-xs text-gray-300">{likes}</TextField>
      </Block>
      <Block direction="row" align="center" gap={2} className="">
        <FaThumbsDown
          size={12}
          className="text-gray-300  hover:text-red/100 transition-all duration-200 cursor-pointer"
        />
        <TextField className="text-xs text-gray-300">{dislikes}</TextField>
      </Block>
      <TextField
        className="text-xs text-gray-500 hover:text-gray-400 transition-all duration-200 cursor-pointer select-none 0"
        onClick={handleReplyClick}
      >
        Reply
      </TextField>
    </Block>
  );
};

export default Controls;
