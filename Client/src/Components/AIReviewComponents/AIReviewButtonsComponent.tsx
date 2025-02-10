import { useNavigate } from "react-router-dom";
import { useAiService } from "../../Utils/Context/AiServiceContext";

interface Props {
    id: string;
  }

const AIReviewButtonsComponent: React.FC<Props> = ({ id }) => {

    const navigate = useNavigate();

    const { deleteService, updateServiceStatus } = useAiService();

    const handleDeleteService = async () => {
      await deleteService(Number(id));
      navigate("/manager/panel");
    }

    const handleUpdateStatus = async () => {
      await updateServiceStatus(Number(id));
      navigate("/manager/panel");
    }





    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#252729] p-4 shadow-lg flex justify-center space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 min-w-[80px]"
        onClick={handleUpdateStatus}
        >
          Accept
        </button>
        <button className="bg-red/70 text-white px-4 py-2 rounded-lg hover:bg-red/50 min-w-[80px]"
        onClick={handleDeleteService}
        >
          Deny
        </button>
      </div>
    );
  };
  
  export default AIReviewButtonsComponent;

