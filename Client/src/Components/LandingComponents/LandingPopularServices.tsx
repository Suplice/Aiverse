import LandingServiceCard from "./LandingServiceCard";

const MockServices = [
  {
    id: 1,
    title: "ChatGPT",
    description: "Description 1",
    price: "Free",
    image: "https://via.placeholder.com/150",
    stars: 4.5,
    reviews: "1.2k",
    Categories: ["AI", "Chatbot"],
  },
  {
    id: 2,
    title: "ReelMagic",
    description: "Description 2",
    price: "$10 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 3.2,
    reviews: 172,
    Categories: ["AI", "Video"],
  },
  {
    id: 3,
    title: "DeepSeek-V3",
    description: "Description 3",
    price: "$1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.1,
    reviews: 32,
    Categories: ["AI", "Search"],
  },
  {
    id: 4,
    title: "Leffa",
    description: "Description 4",
    price: "Free + $1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.3,
    reviews: 983,
    Categories: ["AI", "Video"],
  },
];

const LandingPopularServices = () => {
  return (
    <div className="w-full mt-5">
      <div className="text-3xl font-bold my-4">Popular services</div>
      <div className="bg-white border-2 rounded-lg">
        {MockServices.map((service) => (
          <LandingServiceCard {...service} />
        ))}
      </div>
    </div>
  );
};
export default LandingPopularServices;
