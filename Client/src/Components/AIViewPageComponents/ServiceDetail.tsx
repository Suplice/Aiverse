import React from "react";
import { AiService } from "../../Utils/Models/AiService";
import { Tooltip } from "@mantine/core";
import Button from "../UI/Button";
import { FaHeart } from "react-icons/fa";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import { useAuth } from "../../Utils/Context/AuthContext";

const ServiceDetail: React.FC<{ service: AiService }> = ({ service }) => {
  const { likedServices, handleLike, handleUnLike } = useAiService();

  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-full">
      <div className="md:w-1/4 w-full flex justify-center">
        <img
          src={`${import.meta.env.VITE_API_URL}${service.Image}`}
          alt={service.Title}
          className="rounded-lg shadow-lg max-w-full"
        />
      </div>

      <div className="md:w-3/4 w-full flex flex-col gap-8 h-full">
        <h1 className="text-4xl font-bold">{service.Title}</h1>

        <div className="flex items-center">
          <span className="text-yellow-400 text-2xl">
            {"★".repeat(Math.floor(service.Stars))}
          </span>
          <span className="text-gray-400 text-2xl">
            {"★".repeat(5 - Math.floor(service.Stars))}
          </span>
          <span className="ml-2 text-gray-400">
            ({service.Reviews} reviews)
          </span>
        </div>

        <p className="text-gray-300 text-lg">{service.Description}</p>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-auto">
          <div className="bg-[#252729] p-4 rounded-lg w-full md:w-1/2 ">
            <h2 className="text-2xl font-semibold mb-2 text-center">Pricing</h2>
            <p className="text-gray-300 text-center">{service.Price}</p>
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
            {likedServices.some((s) => s === service.Id) ? (
              <Tooltip
                label="Remove from liked services"
                position="top"
                withArrow
              >
                <div>
                  <Button
                    className={`rounded-full hover:bg-red/75 px-4 py-4 border-black bg-green-800  `}
                    TextColor="white"
                    onClick={async () => {
                      handleUnLike({
                        AiServiceId: service.Id,
                        UserId: user?.Id,
                      });
                    }}
                  >
                    <FaHeart size={24} />
                  </Button>
                </div>
              </Tooltip>
            ) : (
              <Tooltip label="Add to liked services" position="top" withArrow>
                <div>
                  {isAuthenticated && (
                    <Button
                      className={`rounded-full hover:bg-green-700 px-4 py-4 border-black bg-black  `}
                      TextColor="white"
                      onClick={async () => {
                        await handleLike({
                          AiServiceId: service.Id,
                          UserId: user?.Id,
                        });
                      }}
                    >
                      <FaHeart size={24} />
                    </Button>
                  )}
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
