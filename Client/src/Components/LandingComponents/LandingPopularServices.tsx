import { useEffect } from "react";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import BlockTextField from "../UI/BlockTextField";
import TextField from "../UI/TextField";
import LandingServiceCard from "./LandingServiceCard/LandingServiceCard";

const LandingPopularServices = () => {
  const { services } = useAiService();

  useEffect(() => {
    console.log(services)
  })

  return (
    <div className="w-full mt-5 ">
      <BlockTextField color="white" className="font-bold my-4 ">
        <TextField
          value="Popular Services"
          className="text-3xl"
          color="white"
        />
      </BlockTextField>

      <div className=" border-2 border-[#3B3B3D] rounded-lg bg-[#121212] ">
        {services.slice(0, 5).map((service, index) => (
          <LandingServiceCard {...service} index={index} />
        ))}
      </div>
    </div>
  );
};
export default LandingPopularServices;
