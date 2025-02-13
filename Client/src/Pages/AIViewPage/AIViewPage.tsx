import AIViewPageMain from "../../Components/AIViewPageComponents/AIViewPageMain";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import Block from "../../Components/UI/Block";

const AIViewPage = () => {
  return (
    <>
      <Block className="bg-[#121212] p-6 " direction="column">
        <LandingNavbar />
        <AIViewPageMain />
      </Block>
    </>
  );
};

export default AIViewPage;
