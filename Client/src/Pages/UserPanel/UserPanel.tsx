import { useState } from "react";
import UserSettings from "../../Components/UserPanelComponents/UserSettings";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import Block from "../../Components/UI/Block";
import UserLikedServices from "../../Components/UserPanelComponents/UserLikedServices";
import UserReviewedServices from "../../Components/UserPanelComponents/UserReviewedServices";
import UserData from "../../Components/UserPanelComponents/userData";

const UserPanel = () => {
  const [selectedSubPage, setSelectedSubPage] = useState<
    "Settings" | "Liked" | "Rated"
  >("Liked");

  return (
    <Block className="flex flex-col h-screen bg-gradient-to-b bg-[#121212] ">
      <Block className="py-6 px-6 bg-[#121212]">
        <LandingNavbar />
      </Block>
      <UserData
        selectedSubPage={selectedSubPage}
        setSelectedSubPage={setSelectedSubPage}
      />

      <Block align="center" className="mt-12 bg-[#121212] pb-12">
        <Block className="w-4/5">
          {selectedSubPage === "Settings" && <UserSettings />}
          {selectedSubPage === "Liked" && <UserLikedServices />}
          {selectedSubPage === "Rated" && <UserReviewedServices />}
        </Block>
      </Block>
    </Block>
  );
};

export default UserPanel;
