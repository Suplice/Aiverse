import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/Context/AuthContext";
import { Avatar } from "@mantine/core";

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
    <div className="flex justify-between items-center py-4 md:px-8 sm:px-4 px-2 bg-[#121212] relative  shadow-sm mx-2 ">
      <div className="flex items-center flex-row md:gap-20  gap-4  ">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="font-bold  xl:text-4xl md:text-3xl sm:text-2xl text-xl tracking-tighter text-white hover:cursor-pointer"
        >
          AIVERSE.
        </div>
        <div className="hidden md:flex space-x-8 md:text-lg font-medium text-sm ">
          <div className="text-white hover:text-gray-600 transition-colors duration-200 cursor-pointer">
            Hot Services
          </div>
          <div className="text-white hover:text-gray-600 transition-colors duration-200 cursor-pointer">
            Search via AI
          </div>
          <div className="text-white hover:text-gray-600 transition-colors duration-200 cursor-pointer">
            Recently Added
          </div>
        </div>
      </div>
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
                className="absolute  top-[105%] right-0  text-lg font-semibold py-2 px-4  z-40 bg-gray-300 text-black shadow-md  flex flex-col space-y-2 rounded-md"
              >
                <div
                onClick={() => {navigate("/user/panel")}}
                 className="hover:bg-black/10 px-4 py-2 rounded-lg text-center transition-all duration-200">
                  Profile
                </div>
                <div className="hover:bg-black/10 px-4 py-2 rounded-lg text-center transition-all duration-200">
                  Settings
                </div>
                <div
                  onClick={handleLogout}
                  className="hover:bg-black/10 px-4 py-2 rounded-lg text-center transition-all duration-200 text-red/50"
                >
                  Logout
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className=" space-x-4 items-center hidden md:flex">
          <div
            onClick={() => {
              navigate("/auth/SignIn");
            }}
            className="md:text-xl text-md px-6 py-2 font-bold text-white hover:text-gray-600 transition-colors duration-200 cursor-pointer"
          >
            Log In
          </div>
          <div
            onClick={() => {
              navigate("/auth/SignUp");
            }}
            className="md:text-xl text-md font-semibold px-6 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition-all duration-200 cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      )}

      <div
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        className="flex md:hidden flex-row select-none items-center gap-4 border shadow shadow-gray-600 px-2 py-1 rounded-lg text-white font-semibold border-gray-400 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
      >
        Menu
      </div>
      {isMenuOpen && (
        <motion.div className="absolute w-fit h-fit bg-gray-500 shadow-md rounded-lg p-4 md:hidden top-14 z-20 flex flex-col space-y-4 right-4">
          <div className="md:text-lg font-medium text-sm flex flex-col space-y-2 items-center ">
            <div className="text-white hover:text-gray-800 transition-colors duration-200 cursor-pointer ">
              Hot Services
            </div>
            <div className="text-white hover:text-gray-800 transition-colors duration-200 cursor-pointer">
              Search via AI
            </div>
            <div className="text-white hover:text-gray-800 transition-colors duration-200 cursor-pointer">
              Recently Added
            </div>
          </div>
          {isAuthenticated ? (
            <div onClick={handleLogout} className="text-center text-red/50">
              Logout
            </div>
          ) : (
            <div className="flex flex-col space-y-2 items-center">
              <div
                onClick={() => {
                  navigate("/auth/SignIn");
                }}
                className="md:text-xl text-md px-4 py-2 font-semibold text-white hover:text-gray-800 transition-colors duration-200 cursor-pointer"
              >
                Log In
              </div>
              <div
                onClick={() => {
                  navigate("/auth/SignUp");
                }}
                className="md:text-xl text-md font-semibold px-4 py-2 rounded-lg text-white bg-black hover:bg-gray-600 transition-all duration-200 cursor-pointer"
              >
                Sign Up
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LandingNavbar;
