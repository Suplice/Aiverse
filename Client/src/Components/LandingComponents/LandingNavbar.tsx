import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/Context/AuthContext";
import { Avatar } from "@mantine/core";
import TextField from "../UI/TextField";
import LandingNavbarOptions from "./LandingNavbarOptions";
import LandingNavbarLogo from "./LandingNavbarLogo";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";

const LandingNavbar = () => {
  const navigate = useNavigate();

  const { isAuthenticated, Logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu-container")) {
        setIsUserMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await Logout();
    navigate("/");
  };

  return (
    <Block
      className="py-4 md:px-8 sm:px-4 px-2 bg-[#121212] relative  shadow-sm mx-2 "
      direction="row"
      align="center"
      justify="between"
    >
      <Block className="md:gap-20" align="center" direction="row" gap={4}>
        <LandingNavbarLogo />
        <LandingNavbarOptions />
      </Block>
      {isAuthenticated ? (
        <div
          onClick={() => {
            setIsUserMenuVisible(!isUserMenuVisible);
          }}
          className="hidden md:flex hover:cursor-pointer relative user-menu-container"
        >
          <Avatar radius="xl" size="lg" />
          <AnimatePresence>
            {isUserMenuVisible && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute  top-[105%] right-0  text-lg py-2 px-4  z-40 bg-gray-300 text-black shadow-md  flex flex-col space-y-2 rounded-md"
              >
                <BlockTextField
                  color="white"
                  className="hover:bg-black/10 px-4 py-2 rounded-lg transition-all duration-200"
                  onClick={() => {
                    navigate("/user/panel");
                  }}
                >
                  <TextField value="Profile" color="black" />
                </BlockTextField>

                <BlockTextField
                  color="white"
                  className="hover:bg-black/10 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <TextField value="Settings" color="black" />
                </BlockTextField>

                <BlockTextField
                  color="white"
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all duration-200"
                  onClick={() => {
                    navigate("/forms");
                  }}
                >
                  <TextField value="Add Service" className="text-white" />
                </BlockTextField>

                <BlockTextField
                  color="white"
                  className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg  transition-all duration-200 "
                  onClick={handleLogout}
                >
                  <TextField value="Logout" className="text-white" />
                </BlockTextField>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className=" space-x-4 items-center hidden md:flex">
          <BlockTextField
            color="white"
            className="md:text-xl px-6 py-2  hover:text-gray-600 transition-colors duration-200 cursor-pointer"
            onClick={() => {
              navigate("/auth/SignIn");
            }}
          >
            <TextField value="Log In" color="white" />
          </BlockTextField>

          <BlockTextField
            color="white"
            className="md:text-xl px-6 py-2 rounded-lg bg-black hover:bg-gray-800 transition-all duration-200 cursor-pointer"
            onClick={() => {
              navigate("/auth/SignUp");
            }}
          >
            <TextField value="Sign Up" color="white" />
          </BlockTextField>
        </div>
      )}

      <Block
        className="md:hidden select-none border shadow shadow-gray-600 px-2 py-1 rounded-lg  border-gray-400 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
        direction="row"
        align="center"
        gap={4}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <TextField value="Menu" color="white" />
      </Block>
      {isMenuOpen && (
        <motion.div className="absolute w-fit h-fit bg-gray-500 shadow-md rounded-lg p-4 md:hidden top-14 z-20 flex flex-col space-y-4 right-4 ">
          <Block
            className="md:text-lg font-medium text-sm space-y-2"
            direction="column"
            align="center"
          >
            <BlockTextField
              value="Hot Services"
              color="white"
              className="hover:text-gray-800 transition-colors duration-200 cursor-pointer "
            ></BlockTextField>
            <BlockTextField
              value="Search via AI"
              color="white"
              className="hover:text-gray-800 transition-colors duration-200 cursor-pointer "
            ></BlockTextField>
            <BlockTextField
              value="Recently Added"
              color="white"
              className="hover:text-gray-800 transition-colors duration-200 cursor-pointer "
            ></BlockTextField>
          </Block>
          {isAuthenticated ? (
            <BlockTextField
              className="text-red/50"
              onClick={() => {
                navigate("/auth/SignIn");
              }}
            >
              <TextField value="Logout" className="text-red/50" />
            </BlockTextField>
          ) : (
            <Block className="space-y-2" align="center" direction="column">
              <BlockTextField
                color="white"
                className="md:text-xl px-4 py-2  hover:text-gray-800 transition-colors duration-200 cursor-pointer "
                onClick={() => {
                  navigate("/auth/SignIn");
                }}
              >
                <TextField value="Log In" color="white" />
              </BlockTextField>

              <BlockTextField
                color="white"
                className="md:text-xl  px-4 py-2 rounded-lg bg-black hover:bg-gray-600 transition-all duration-200 cursor-pointer"
                onClick={() => {
                  navigate("/auth/SignUp");
                }}
              >
                <TextField value="Sign Up" color="white" />
              </BlockTextField>
            </Block>
          )}
        </motion.div>
      )}
    </Block>
  );
};

export default LandingNavbar;
