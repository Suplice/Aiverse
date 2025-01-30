import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import LandingPopularServices from "../../Components/LandingComponents/LandingPopularServices";
import LandingServiceSearch from "../../Components/LandingComponents/LandingServiceSearch";
import Block from "../../Components/UI/Block";

const LandingPage = () => {
  return (
    <Block className="bg-[#121212] p-6 " direction="column">
      <LandingNavbar />
      <LandingServiceSearch />
      <LandingPopularServices />
    </Block>
  );
};

export default LandingPage;
