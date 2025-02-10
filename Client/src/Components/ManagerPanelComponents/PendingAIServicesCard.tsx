import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import Block from "../UI/Block";
import BlockTextField from "../UI/BlockTextField";
import { AiService } from "../../Utils/Models/AiService";

interface PendingAIServicesCardProps {
  service: AiService;
  index: number;
}

const PendingAIServicesCard: React.FC<PendingAIServicesCardProps> = ({
  service,
  index,
}) => {
  const navigate = useNavigate();
  return (
    <Block
      key={service.Id}
      className={`flex-col border-[#3B3B3D] cursor-pointer flex-grow`}
      direction="column"
    >
      <Block
        className="bg-[#252729] w-full rounded-lg lg:p-10 md:p-6 p-4 flex-col md:flex-row relative flex items-center gap-6"
        direction="row"
        justify="between"
      >
        <BlockTextField className="text-white text-xl font-bold">
          {index + 1}
        </BlockTextField>

        <div className="flex items-center gap-6 w-full flex-col md:flex-row">
          <img
            src={`${import.meta.env.VITE_API_URL}${service.Image}`}
            alt={service.Title}
            className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0"
          />

          <div className="flex flex-col justify-center w-full">
            <h3 className="text-white text-2xl font-bold mb-1">
              {service.Title}
            </h3>
            <p className="text-gray-400 text-sm mb-2">{service.Description}</p>
            <p className="text-gray-300 font-medium mb-1">Price: {service.Price}</p>
            <p className="text-gray-500 text-sm">
              Created at: {new Date(service.CreatedAt!).toLocaleDateString()}
            </p>
          </div>

          <Button
            onClick={() => navigate(`/manager/review/${service.Id}`)}
            className="flex items-center justify-center px-4 py-2 bg-[#3B3B3D] rounded-lg hover:bg-[#4A4A4A] transition-colors whitespace-nowrap min-w-[80px] mt-4 md:mt-0"
          >
            View
          </Button>
        </div>
      </Block>
    </Block>
  );
};

export default PendingAIServicesCard;
