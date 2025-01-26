import { Tooltip } from "@mantine/core";
import { FaHeart } from "react-icons/fa";
import Button from "../../UI/Button";
import { IoIosArrowDropdown } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";
import Block from "../../UI/Block";
import { useAiService } from "../../../Utils/Context/AiServiceContext";
import { useAuth } from "../../../Utils/Context/AuthContext";

interface LandingServiceCardButtonProps {
  isDescriptionVisible: boolean;
  setIsDescriptionVisible: (value: boolean) => void;
  isAuthenticated: boolean;
  id: number;
}

const LandingServiceCardButtons: React.FC<LandingServiceCardButtonProps> = (
  props
) => {
  const { likedServices, handleLike, handleUnLike } = useAiService();

  const { user } = useAuth();

  return (
    <Block
      className="w-full md:w-1/4 flex-wrap"
      justify="center"
      direction="row"
      align="center"
      gap={4}
    >
      <Tooltip label="Visit page" position="top" withArrow>
        <div>
          <Button
            className="rounded-full px-4 py-4 border-black bg-black hover:bg-slate-500"
            TextColor="white"
          >
            <LuExternalLink size={24} />
          </Button>
        </div>
      </Tooltip>
      <Tooltip
        label={
          props.isDescriptionVisible ? "Hide description" : "Show description"
        }
        position="top"
        withArrow
      >
        <div>
          <Button
            onClick={() =>
              props.setIsDescriptionVisible(!props.isDescriptionVisible)
            }
            className="rounded-full px-4 py-4 border-black bg-black hover:bg-slate-500"
            TextColor="white"
          >
            <IoIosArrowDropdown
              size={24}
              className={`transform transition-transform duration-200 ${
                props.isDescriptionVisible ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </div>
      </Tooltip>
      {props.isAuthenticated && (
        <div>
          {likedServices.some((s) => s === props.id) ? (
            <Tooltip
              label="Remove from liked services"
              position="top"
              withArrow
            >
              <div>
                <Button
                  className={`rounded-full hover:bg-red/75 px-4 py-4 border-black bg-green-800  `}
                  TextColor="white"
                  onClick={async () => {
                    handleUnLike({
                      AiServiceId: props.id,
                      UserId: user?.Id,
                    });
                  }}
                >
                  <FaHeart size={24} />
                </Button>
              </div>
            </Tooltip>
          ) : (
            <Tooltip label="Add to liked services" position="top" withArrow>
              <div>
                <Button
                  className={`rounded-full hover:bg-green-700 px-4 py-4 border-black bg-black  `}
                  TextColor="white"
                  onClick={async () => {
                    await handleLike({
                      AiServiceId: props.id,
                      UserId: user?.Id,
                    });
                  }}
                >
                  <FaHeart size={24} />
                </Button>
              </div>
            </Tooltip>
          )}
        </div>
      )}
    </Block>
  );
};

export default LandingServiceCardButtons;
