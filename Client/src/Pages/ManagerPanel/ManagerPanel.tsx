import FormsToCheck from "../../Components/ManagerPanelComponents/FormsToCheck";
import ReviewsToCheck from "../../Components/ManagerPanelComponents/ReviewsToCheck";
import { useState } from "react";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import Block from "../../Components/UI/Block";
import Button from "../../Components/UI/Button";

const ModeratorPanel = () => {
  const [selectedSubPage, setSelectedSubPage] = useState<"To check" | "Reviews" | "Reports">("To check");
  const pages: Array<"To check" | "Reviews" | "Reports"> = ["To check", "Reviews", "Reports"];

  return (
    <Block className="flex flex-col h-screen bg-gradient-to-b bg-[#121212]">
      <Block className="py-6 px-6 bg-[#121212]">
        <LandingNavbar />
      </Block>

      <Block direction="column" className="flex-1">
        {/* Moderator Panel Heading */}
        <Block
          className="bg-gradient-to-r bg-[#1E1E1E] mt-10 flex items-center shadow-2xl border-2 border-[#333333] rounded-3xl py-8 px-10 w-11/12 sm:w-4/5 lg:w-3/5 mx-auto"
          direction="row"
          justify="center"
        >
          <Block direction="column" className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-100">Moderator Panel</h1>
            <p className="text-gray-400 mt-3 text-lg"></p>
          </Block>
        </Block>

        {/* Separator */}
        <Block className="border-t-2 border-[#444444] my-12 w-11/12 mx-auto"></Block>

        {/* Navigation Buttons */}
        <Block className="bg-[#121212]">
          <Block
            direction="row"
            justify="center"
            align="center"
            gap="6"
            className="flex items-center justify-center shadow-2xl rounded-2xl border border-[#444444] py-8 px-12 w-11/12 sm:w-4/5 lg:w-3/5 mx-auto bg-gradient-to-r bg-[#1E1E1E]"
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => setSelectedSubPage(page)}
                className={`px-8 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
                  selectedSubPage === page
                    ? "bg-gradient-to-r bg-[#333333] text-white border-[#444444] scale-105"
                    : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
                }`}
                value={page}
                type="button"
                id={`button-${page}`}
              />
            ))}
          </Block>
        </Block>

        {/* Content Section */}
        <Block align="center" className="mt-16 bg-[#121212]">
          <Block className="w-4/5">
            {selectedSubPage === "To check" && <FormsToCheck />}
            {selectedSubPage === "Reviews" && <ReviewsToCheck />}
            {selectedSubPage === "Reports" && (
              <div className="text-white text-lg">Review User Reports</div>
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default ModeratorPanel;
