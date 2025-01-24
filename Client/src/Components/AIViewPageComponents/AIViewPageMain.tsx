import { useParams } from "react-router";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import ServiceDetail from "./ServiceDetail";

  const AIViewPageMain = () => {
    const {id} = useParams<{id: string}>(); 
    const { services } = useAiService();
  
    return (
        <ServiceDetail service={services[Number(id)]} />
    )
  }

export default AIViewPageMain;