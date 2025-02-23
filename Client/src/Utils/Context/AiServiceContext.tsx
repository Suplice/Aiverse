import { useState, useContext, createContext, useEffect } from "react";
import { AiService } from "../Models/AiService";
import { useAuth } from "./AuthContext";
import { HandleLike } from "../Models/handleLike";
import { Review } from "../Models/Review";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";

interface AiServiceContextType {
  services: AiService[];
  setServices: (services: AiService[]) => void;
  addService: (service: AiService) => Promise<void>;
  updateService: (service: AiService) => Promise<void>;
  deleteService: (Id: number) => Promise<void>;
  updateServiceStatus: (Id: number) => Promise<void>;
  likedServices: number[];
  setLikedServices: (likedServices: number[]) => void;
  handleLike: (data: HandleLike) => Promise<void>;
  handleUnLike: (data: HandleLike) => Promise<void>;
  fetchServices: () => Promise<void>;
  handleServiceReviewed: (review: Review, aiServiceId: number) => void;
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user } = useAuth();

  /**
   * A function to fetch all services.
   * It fetches the services from the API.
   * If the response is successful, it sets the services to the state.
   * If there is an error, it logs the error to the console.
   * If the services are already in the session storage and the timestamp is less than 30 seconds, it sets the services to the state.
   * @async
   * @function fetchServices
   * @returns {Promise<void>}
   */
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const cachedServices = sessionStorage.getItem("services");
      const cachedTimestamp = sessionStorage.getItem("servicesTimestamp");

      if (
        cachedServices &&
        cachedTimestamp &&
        Date.now() - parseInt(cachedTimestamp, 10) < 30000
      ) {
        setServices(JSON.parse(cachedServices));
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/getall`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const data = await response.json();
      setServices(data.data);

      sessionStorage.setItem("services", JSON.stringify(data.data));
      sessionStorage.setItem("servicesTimestamp", Date.now().toString());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * A function to add a service to the database.
   * It sends a POST request to the API with the service data.
   * If the response is successful, it sets the services to the state.
   * If there is an error, it logs the error to the console.
   * @async
   * @function addService
   * @param {AiService} service - The service to be added to the database
   * @returns {Promise<void>}
   */
  const addService = async (service: AiService) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();
      setServices([...services, data]);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * A function to update a service in the database.
   * It sends a PUT request to the API with the service data.
   * If the response is successful, it sets the services to the state.
   * If there is an error, it logs the error to the console.
   * @async
   * @function updateService
   * @param {AiService} service - The service to be updated in the database
   * @returns {Promise<void>}
   */
  const updateService = async (service: AiService) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/services/${service.Id}`,
        {
          method: "PUT",
          credentials: "include",
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
      console.error(error);
    }
  };

  /**
   * A function to update the status of a service in the database.
   * It sends a PATCH request to the API with the service id.
   * If the response is successful, it sets the services to the state.
   * If there is an error, it logs the error to the console.
   * @async
   * @function updateServiceStatus
   * @param {number} Id - The id of the service to be deleted from the database
   * @returns {Promise<void>}
   */
  const updateServiceStatus = async (Id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/updatestatus/${Id}`,
        {
          credentials: "include",
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.Id === Id ? { ...service, Status: "Verified" } : service
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * A function to delete a service from the database.
   * It sends a DELETE request to the API with the service id.
   * If the response is successful, it sets the services to the state.
   * If there is an error, it logs the error to the console.
   * @async
   * @function deleteService
   * @param {number} Id - The id of the service to be deleted from the database
   * @returns {Promise<void>}
   */
  const deleteService = async (Id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/aiservice/deletebyid/${Id}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      const updatedServices = services.filter((s) => s.Id !== Id);
      setServices(updatedServices);
    } catch (error) {
      console.error("Error" + error);
    }
  };

  /**
   * A function to fetch the services liked by the user.
   * It fetches the liked services from the API.
   * If the response is successful, it sets the liked services to the state.
   * If there is an error, it logs the error to the console.
   * @async
   * @function fetchServicesLikedByUser
   * @returns {Promise<void>}
   */
  const fetchServicesLikedByUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/likes/likedbyuser/${user?.Id}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setLikedServices(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * A function to like a service.
   * It sends a POST request to the API with the service id and user id.
   * If the response is successful, it sets the liked services to the state.
   * If there is an error, it logs the error to the console.
   * @async
   * @function handleLike
   * @param {HandleLike} data - Provides id of service to be liked and user id
   * @returns {Promise<void>}
   */
  const handleLike = async (data: HandleLike) => {
    try {
      if (!user) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/likes/likeService`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AiServiceId: data.AiServiceId,
            UserId: data.UserId,
          }),
        }
      );

      if (response.ok) {
        setLikedServices([...likedServices, data.AiServiceId]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * A function to unlike a service.
   * It sends a POST request to the API with the service id and user id.
   * If the response is successful, it sets the liked services to the state.
   * If there is an error, it logs the error to the console.
   * @async
   * @param {HandleLike} data - Provides id of service to be unliked and user id
   * @returns {Promise<void>}
   */
  const handleUnLike = async (data: HandleLike) => {
    try {
      if (!user) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/likes/dislikeService`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AiServiceId: data.AiServiceId,
            UserId: data.UserId,
          }),
        }
      );

      if (response.ok) {
        setLikedServices(likedServices.filter((s) => s !== data.AiServiceId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * A function to handle a service being reviewed.
   * It updates the service's stars and reviews count.
   * @function handleServiceReviewed
   * @param {Review} review review to be added to the service
   * @param {number} aiServiceId id of the service to be reviewed
   * @returns {void}
   */
  const handleServiceReviewed = (review: Review, aiServiceId: number) => {
    const service = services.find((s) => s.Id === aiServiceId);

    service!.Stars =
      (service!.Stars * service!.Reviews + review.Stars) /
      (service!.Reviews + 1);

    service!.Reviews += 1;

    setServices(services.map((s) => (s.Id === aiServiceId ? service! : s)));
  };

  /**
   * Fetches services and liked services when the component mounts.
   */
  useEffect(() => {
    fetchServices();
  }, []);

  /**
   * Fetches liked services when the user changes.
   * If the user is authenticated, it fetches the liked services.
   * If the user is not authenticated, it sets the liked services to an empty array.
   */
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
        updateServiceStatus,
        deleteService,
        likedServices,
        setLikedServices,
        handleLike,
        handleUnLike,
        fetchServices,
        handleServiceReviewed,
      }}
    >
      {isLoading ? <LoadingPage /> : children}
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
