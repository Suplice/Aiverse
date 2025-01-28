import { useState, useContext, createContext, useEffect } from "react";
import { AiService } from "../Models/AiService";
import { useAuth } from "./AuthContext";
import { HandleLike } from "../Models/handleLike";

interface AiServiceContextType {
  services: AiService[];
  setServices: (services: AiService[]) => void;
  addService: (service: AiService) => Promise<void>;
  updateService: (service: AiService) => Promise<void>;
  deleteService: (Id: number) => Promise<void>;
  likedServices: number[];
  setLikedServices: (likedServices: number[]) => void;
  handleLike: (data: HandleLike) => Promise<void>;
  handleUnLike: (data: HandleLike) => Promise<void>;
  fetchServices: () => Promise<void>;
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
  const [likedServices, setLikedServices] = useState<number[]>([]);

  const { user } = useAuth();

  const fetchServices = async () => {
    try {
      const cachedServices = sessionStorage.getItem("services");
      const cachedTimestamp = sessionStorage.getItem("servicesTimestamp");

      if (
        cachedServices &&
        cachedTimestamp &&
        Date.now() - parseInt(cachedTimestamp, 10) < 30000
      ) {
        setServices(JSON.parse(cachedServices));
        console.log("Użyto cache dla serwisów.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/getall`
      );
      const data = await response.json();
      setServices(data.data);

      sessionStorage.setItem("services", JSON.stringify(data.data));
      sessionStorage.setItem("servicesTimestamp", Date.now().toString());
      console.log("Pobrano serwisy z API i zapisano w cache.");
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

  const fetchServicesLikedByUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/likedbyuser/${user?.Id}`
      );
      const data = await response.json();
      setLikedServices(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (data: HandleLike) => {
    try {
      if (!user) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/likeService`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AiServiceId: data.AiServiceId,
            UserId: data.UserId,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setLikedServices([...likedServices, data.AiServiceId]);
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnLike = async (data: HandleLike) => {
    try {
      if (!user) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/dislikeService`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AiServiceId: data.AiServiceId,
            UserId: data.UserId,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setLikedServices(likedServices.filter((s) => s !== data.AiServiceId));
      }

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (user) {
      fetchServicesLikedByUser();
    }
  }, []);

  return (
    <AiServiceContext.Provider
      value={{
        services,
        setServices,
        addService,
        updateService,
        deleteService,
        likedServices,
        setLikedServices,
        handleLike,
        handleUnLike,
        fetchServices,
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
