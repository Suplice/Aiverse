import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import FormsToCheck from "../../Components/ManagerPanelComponents/FormsToCheck";
import Block from "../../Components/UI/Block";
import { useState } from "react";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import { AiService } from "../../Utils/Models/AiService";

const ManagerPanel = () => {
  const [selectedSubPage, setSelectedSubPage] = useState<"To check" | "Review" | "Services">("Review");

  const allServices = useAiService();
 
  const services = allServices.services.filter((service: AiService) => service.Status === "Pending");

  return (
    <>
      <Block className="bg-[#121212] p-6 w-full min-h-screen" direction="column">
        <LandingNavbar />

        <div className="flex flex-col items-center mt-6">
          <div className="flex space-x-4 bg-[#1E1E1E] p-2 rounded-xl">
            <button
              onClick={() => setSelectedSubPage("Review")}
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
                selectedSubPage === "Review"
                  ? "bg-[#2E2E2E] text-white"
                  : "bg-[#1E1E1E] text-gray-400 hover:bg-[#2A2A2A]"
              }`}
            >
              Review
            </button>
          </div>

          <div className="mt-6 w-full flex justify-center">
            {selectedSubPage === "Review" && <FormsToCheck services={services}/>}
          </div>
        </div>
      </Block>
    </>
  );
};

export default ManagerPanel;
