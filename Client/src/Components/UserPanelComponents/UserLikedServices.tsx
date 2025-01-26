import LandingServiceCard from "../LandingComponents/LandingServiceCard/LandingServiceCard";

import { AiService } from "../../Utils/Models/AiService";
import { useEffect, useState } from "react";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";
import LoadingServicesSkeleton from "../SearchPageComponents/LoadingServicesSkeleton";

const UserLikedServices = ({ userId }: { userId: number }) => {
  const [likedServices, setLikedServices] = useState<AiService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log("Fetching liked services for userId:", userId);

  useEffect(() => {
    const fetchLikedServices = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/aiservice/likedServices/${userId}`);
        const data = await response.json();
        setLikedServices(data.data);

        if (data.success) {
          setLikedServices(data.data); 
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId > 0) {
      fetchLikedServices();
    } else {
      console.warn("Invalid userId:", userId);
      setIsLoading(false);
    }
  }, [userId]);

  return (
    <Block
      className="w-full lg:px-10 md:px-6 sm:px-2"
      direction="column"
      gap={10}
      justify="center"
    >
      {isLoading ? (
        <LoadingServicesSkeleton />
      ) : (
        <div className="bg-[#121212] border-2 border-[#3B3B3D] rounded-lg">
          {likedServices.length > 0 ? (
            likedServices.map((service, index: number) => (
                <LandingServiceCard
                key={service.Id}
                index={index}
                Image={service.Image} // Zmienna z obiektu `service`
                Title={service.Title} // Zmienna z obiektu `service`
                Stars={service.Stars} // Zmienna z obiektu `service`
                Reviews={service.Reviews} // Zmienna z obiektu `service`
                Categories={ ["Default Category"]} // Zmienna z obiektu `service`, z wartością domyślną
                Price={service.Price} // Zmienna z obiektu `service`
                Id={service.Id} 
                Description={service.Description}                />
            ))
          ) : (
            <BlockTextField
              color="white"
              className="text-white text-center p-5"
            >
              No services found
            </BlockTextField>
          )}
        </div>
      )}
    </Block>
  );
};

export default UserLikedServices;
