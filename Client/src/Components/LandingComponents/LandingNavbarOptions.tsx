import BlockTextField from "../UI/BlockTextField";

const LandingNavbarOptions = () => {
  return (
    <div className="hidden md:flex space-x-8 md:text-lg font-medium text-sm ">
      <BlockTextField
        value="Hot Services"
        color="white"
        className="hover:text-gray-300 transition-colors duration-200 cursor-pointer "
      ></BlockTextField>
      <BlockTextField
        value="Search via AI"
        color="white"
        className="hover:text-gray-300 transition-colors duration-200 cursor-pointer "
      ></BlockTextField>
      <BlockTextField
        value="Recently Added"
        color="white"
        className="hover:text-gray-300 transition-colors duration-200 cursor-pointer "
      ></BlockTextField>
    </div>
  );
};

export default LandingNavbarOptions;
