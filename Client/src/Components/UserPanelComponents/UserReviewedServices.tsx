import LandingServiceCard from "../LandingComponents/LandingServiceCard/LandingServiceCard";

import { AiService } from "../../Utils/Models/AiService";
import { useEffect, useState } from "react";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";
import LoadingServicesSkeleton from "../SearchPageComponents/LoadingServicesSkeleton";

const UserReviewedServices = ({ userId }: { userId: number }) => {
  const [reviewedServices, setReviewedServices] = useState<AiService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLikedServices = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/aiservice/reviewedServices/${userId}`
        );
        const data = await response.json();
        setReviewedServices(data.data);

        if (data.success) {
          setReviewedServices(data.data);
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
          {reviewedServices.length > 0 ? (
            reviewedServices.map((service, index: number) => (
              <LandingServiceCard
                key={service.Id}
                index={index}
                Image={service.Image}
                Title={service.Title}
                Stars={service.Stars}
                Reviews={service.Reviews}
                Categories={service.Categories}
                Price={service.Price}
                Id={service.Id}
                ServiceURL={service.ServiceURL}
                Description={service.Description}
              />
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

export default UserReviewedServices;
