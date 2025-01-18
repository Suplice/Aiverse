import FormsToCheck from "../../Components/ManagerPanelComponents/FormsToCheck";
import { useState } from "react";

const ManagerPanel = () => {
 const [selectedSubPage, setSelectedSubPage] = useState<"To check" | "Reviews" | "Services">("To check");

  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-gray-400 text-black p-4">
        <h2 className="text-xl font-bold mb-4">Manager menu</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setSelectedSubPage("To check")}
                className="text-lg hover:bg-gray-100 p-3 block w-full text-left rounded"
              >
                To check
              </button>
            </li>
            <li> 
              <button
                onClick={() => setSelectedSubPage("Reviews")}
                className="text-lg hover:bg-gray-100 p-3 block w-full text-left rounded"
              >
                Reviews
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSubPage("Services")}
                className="text-lg hover:bg-gray-100 p-3 block w-full text-left rounded"
              >
                Services
              </button>
            </li>
          </ul>
      </div>
  
      <div className="flex justify-center mt-6 flex-grow">
        {selectedSubPage === "To check" && <FormsToCheck />}
        {selectedSubPage === "Reviews" && <div>REVIEWS!!!</div>}
        {selectedSubPage === "Services" && <div>SERVICES!!!</div>}
      </div>
    </div>
  );
};  
export default ManagerPanel;