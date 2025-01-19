import LandingServiceCard from "./LandingServiceCard";

const MockServices = [
  {
    Id: 1,
    Title: "ChatGPT",
    Description: "Description 1",
    Price: "Free",
    Image: "https://via.placeholder.com/150",
    Stars: 4.5,
    Reviews: 1200,
    Categories: ["AI", "Chatbot"],
  },
  {
    Id: 2,
    Title: "ReelMagic",
    Description: "Description 2",
    Price: "$10 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 3.2,
    Reviews: 172,
    Categories: ["AI", "Video"],
  },
  {
    Id: 3,
    Title: "DeepSeek-V3",
    Description: "Description 3",
    Price: "$1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.1,
    Reviews: 32,
    Categories: ["AI", "Search"],
  },
  {
    Id: 4,
    Title: "Leffa",
    Description: "Description 4",
    Price: "Free + $1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.3,
    Reviews: 983,
    Categories: ["AI", "Video"],
  },
];

const LandingPopularServices = () => {
  return (
    <div className="w-full mt-5 ">
      <div className="text-3xl font-bold my-4 text-white">Popular services</div>
      <div className=" border-2 border-[#3B3B3D] rounded-lg bg-[#121212] ">
        {MockServices.map((service, index) => (
          <LandingServiceCard {...service} index={index} />
        ))}
      </div>
    </div>
  );
};
export default LandingPopularServices;
