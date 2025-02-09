import { useEffect, useState } from "react";
import PendingAIServicesCard from "./PendingAIServicesCard";
import { AiService } from "../../Utils/Models/AiService";

interface FormsToCheckProps {
  services: AiService[];
}

const FormsToCheck: React.FC<FormsToCheckProps> = ({services}) => {


  return (
    <div className="p-6 bg-[#1E1E1E] rounded-2xl shadow-lg w-5/6 text-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-white">Pending AI Services</h2>

      <ul className="space-y-3">
        {services.map((service, index) => (
          <li key={service.Id} className="flex w-full bg-[#2E2E2E] p-4 md:p-2 mb:p-1 rounded-xl">
            <PendingAIServicesCard service={service} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormsToCheck;
