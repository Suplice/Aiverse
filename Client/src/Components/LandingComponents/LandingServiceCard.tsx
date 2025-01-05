import { TiStarFullOutline } from "react-icons/ti";
import { LuExternalLink } from "react-icons/lu";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@mantine/core";
import { useAuth } from "../../Utils/Context/AuthContext";
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";

interface LandingServiceCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  stars: number;
  reviews: number | string;
  Categories: string[];
  index: number;
}

const LandingServiceCard: React.FC<LandingServiceCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  stars,
  reviews,
  Categories,
  index,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] =
    useState<boolean>(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className={`flex flex-col    p-4 ${
        id === 1 ? "border-t-0" : "border-t-2"
      }`}
    >
      <div className="bg-gray-300/50 w-full rounded-lg p-10 flex md:flex-row flex-col gap-4 items-center relative">
        <div>{id}</div>
        <div className="flex flex-col justify-between w-full text-center">
          <div className="flex flex-col md:flex-row justify-between items-center  gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-1/4 items-center">
              <img src={image} alt={title} className="w-14" />
              <div className="flex flex-col items-center md:items-start">
                <p className="text-2xl font-semibold">{title}</p>
                <div className="flex flex-row gap-2">
                  <p className="flex flex-row gap-1 items-center">
                    <TiStarFullOutline className="text-yellow-300" />
                    {stars}
                  </p>
                  <p className="underline">{reviews} Reviews</p>
                </div>
              </div>
            </div>

            <p className="w-full md:w-1/4 text-xl font-mono text-center md:text-left">
              {price}
            </p>
            <p className="w-full md:w-1/4 font-semibold text-md text-center md:text-left">
              {Categories.join(", ")}
            </p>
            <div className="w-full md:w-1/4 flex justify-around">
              <Tooltip label="Visit page" position="top" withArrow>
                <button className="rounded-full   px-4 py-4 border-black bg-white hover:bg-slate-100 transition-colors duration-200">
                  <LuExternalLink size={24} />
                </button>
              </Tooltip>
              <Tooltip
                label={
                  isDescriptionVisible ? "Hide description" : "Show description"
                }
                position="top"
                withArrow
              >
                <button
                  onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
                  className="rounded-full px-4 py-4 border-black bg-white hover:bg-slate-100 transition-colors duration-200"
                >
                  <IoIosArrowDropdown
                    size={24}
                    className={`transform transition-transform duration-200 ${
                      isDescriptionVisible ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </Tooltip>
              {isAuthenticated && (
              <Tooltip label="Add to liked services" position="top" withArrow>
                <button className="rounded-full hover:bg-green-700   px-4 py-4 border-black bg-white  transition-all duration-200 ">
                  <FaHeart size={24} />
                  
                {/*TODO: 
                 - Check whether service is already liked, if yes then swap FaHeart to slashed heart and background to red
                 - Implement logic of adding and erasing from liked services*/}
                </button>
              </Tooltip>
            ) }
              </div>
          </div>
        </div>
        {index > 1 && !isAuthenticated ? (
          <div className="absolute w-full h-full inset-0 rounded-lg bg-black/20 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-3xl font-semibold text-black">
                You need to sign in to view this service.
              </p>
              <button
                onClick={() => {
                  navigate("/auth/SignIn");
                }}
                className="px-4 py-2 bg-black text-white rounded-lg mt-4"
              >
                Sign in
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <AnimatePresence>
        {isDescriptionVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full p-2">
              <p>{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingServiceCard;
