import { useNavigate } from "react-router-dom";

interface Props {
    id: string;
  }

const AIReviewButtonsComponent: React.FC<Props> = ({ id }) => {

    const navigate = useNavigate();


    const handleUpdateStatus = async () => {
        try {

            console.log("Id :" + id )
            const response = await fetch(`${import.meta.env.VITE_API_URL}/aiservice/updatestatus/${id}`, {
                method: "PATCH",
            });
        
            if (!response.ok) {
                throw new Error("Błąd podczas aktualizacji statusu");
            }
        
            navigate("/manager/panel");
        } catch (error) {
          console.error("Błąd:", error);
        }
      };

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#252729] p-4 shadow-lg flex justify-center space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 min-w-[80px]"
        onClick={handleUpdateStatus}
        >
          Accept
        </button>
        <button className="bg-red/70 text-white px-4 py-2 rounded-lg hover:bg-red/50 min-w-[80px]"
        onClick={() => {
            navigate("/manager/panel");
          }}
        >
          Deny
        </button>
      </div>
    );
  };
  
  export default AIReviewButtonsComponent;