import LandingServiceCard from "../LandingComponents/LandingServiceCard/LandingServiceCard";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";
import { useAiService } from "../../Utils/Context/AiServiceContext";

const UserLikedServices = () => {
  const { likedServices, services } = useAiService();

  const myServices = services.filter((s) => likedServices.includes(s.Id));

  return (
    <Block
      className="w-full lg:px-10 md:px-6 sm:px-2"
      direction="column"
      gap={10}
      justify="center"
    >
      <Block className="bg-[#121212] border-2 border-[#3B3B3D] rounded-lg">
        {likedServices.length > 0 ? (
          myServices.map((service, index: number) => (
            <LandingServiceCard
              ServiceURL={service.ServiceURL}
              key={service.Id}
              index={index}
              Image={service.Image}
              Title={service.Title}
              Stars={service.Stars}
              Reviews={service.Reviews}
              Categories={service.Categories || ["Default Category"]}
              Price={service.Price}
              Id={service.Id}
              Description={service.Description}
            />
          ))
        ) : (
          <BlockTextField color="white" className="text-white text-center p-5">
            No services found
          </BlockTextField>
        )}
      </Block>
    </Block>
  );
};

export default UserLikedServices;
