import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import LandingPopularServices from "../../Components/LandingComponents/LandingPopularServices";
import LandingServiceSearch from "../../Components/LandingComponents/LandingServiceSearch";

const LandingPage = () => {
  return (
    <div className="flex flex-col p-6 bg-[#121212] ">
      <LandingNavbar />
      <LandingServiceSearch />
      <LandingPopularServices />
    </div>
  );
};

export default LandingPage;
