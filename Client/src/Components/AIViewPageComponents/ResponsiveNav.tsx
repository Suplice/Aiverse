import { Tooltip } from "@mantine/core";
import { useState, useEffect } from "react";
import { FaFileAlt, FaImages, FaComments } from "react-icons/fa";

const ResponsiveNav = () => {
  /**
   * State that holds whether the page is in compact mode or not.
   */
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    /**
     * Handles resizing of the window and sets the isCompact state accordingly.
     * @function handleResize
     * @returns {void}
     */
    const handleResize = () => {
      setIsCompact(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Scrolls to the section with the corresponding id when a button is clicked.
   * @function handleScroll
   * @param {string} sectionId - The id of the section to scroll to.
   * @returns {void}
   */
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#252729] p-6 w-full rounded-lg ">
      <nav className="flex justify-center space-x-8">
        <Tooltip label="Full Description" position="top">
          <button
            className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-700 flex items-center"
            onClick={() => handleScroll("full-description")}
          >
            {isCompact ? <FaFileAlt size={20} /> : "Full Description"}
          </button>
        </Tooltip>
        <Tooltip label="Gallery" position="top">
          <button
            className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-700 flex items-center"
            onClick={() => handleScroll("gallery")}
          >
            {isCompact ? <FaImages size={20} /> : "Gallery"}
          </button>
        </Tooltip>
        <Tooltip label="Comments" position="top">
          <button
            className="px-4 py-2 text-sm font-medium rounded hover:bg-gray-700 flex items-center"
            onClick={() => handleScroll("comments")}
          >
            {isCompact ? <FaComments size={20} /> : "Comments"}
          </button>
        </Tooltip>
      </nav>
    </div>
  );
};

export default ResponsiveNav;
