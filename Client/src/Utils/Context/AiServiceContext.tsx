import { useState, useContext, createContext, useEffect } from "react";
import { AiService } from "../Models/AiService";

interface AiServiceContextType {
  services: AiService[];
  setServices: (services: AiService[]) => void;
  addService: (service: AiService) => Promise<void>;
  updateService: (service: AiService) => Promise<void>;
  deleteService: (Id: number) => Promise<void>;
}

const AiServiceContext = createContext<AiServiceContextType | undefined>(
  undefined
);

export const AiServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [services, setServices] = useState<AiService[]>([]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/aiservice/getall`);
      const data = await response.json();
      setServices(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addService = async (service: AiService) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();
      setServices([...services, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateService = async (service: AiService) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/services/${service.Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(service),
        }
      );
      const data = await response.json();
      const updatedServices = services.map((s) =>
        s.Id === data.id ? data : s
      );
      setServices(updatedServices);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteService = async (Id: number) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/services/${Id}`, {
        method: "DELETE",
      });
      const updatedServices = services.filter((s) => s.Id !== Id);
      setServices(updatedServices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
    console.log("fetching services");
  }, []);

  return (
    <AiServiceContext.Provider
      value={{
        services,
        setServices,
        addService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </AiServiceContext.Provider>
  );
};

export const useAiService = () => {
  const context = useContext(AiServiceContext);
  if (!context) {
    throw new Error("useAiService must be used within a AiServiceProvider");
  }
  return context;
};
