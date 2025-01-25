import React, { useEffect } from 'react';
import { AiService } from '../../Utils/Models/AiService';
import { Tooltip } from '@mantine/core';
import Button from '../UI/Button';
import Block from '../UI/Block';
import { LuExternalLink } from 'react-icons/lu';
import { FaHeart } from 'react-icons/fa';

const ServiceDetail: React.FC<{ service: AiService }> = ({ service }) => {
  useEffect(() => {
     console.log(service);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-full">
  {/* Sekcja obrazu */}
  <div className="md:w-1/4 w-full flex justify-center">
    <img
      src="https://picsum.photos/id/593/400/400"
      alt={service.Title}
      className="rounded-lg shadow-lg max-w-full"
    />
  </div>

  {/* Sekcja opisu */}
  <div className="md:w-3/4 w-full flex flex-col gap-8 h-full">
    {/* Tytuł */}
    <h1 className="text-4xl font-bold">{service.Title}</h1>

    {/* Oceny */}
    <div className="flex items-center">
      <span className="text-yellow-400 text-2xl">
        {"★".repeat(Math.floor(service.Stars))}
      </span>
      <span className="text-gray-400 text-2xl">
        {"★".repeat(5 - Math.floor(service.Stars))}
      </span>
      <span className="ml-2 text-gray-400">({service.Reviews} reviews)</span>
    </div>

    {/* Opis */}
    <p className="text-gray-300 text-lg">{service.Description}</p>

    {/* Pricing i ikony */}
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-auto">
      {/* Pricing */}
      <div className="bg-[#252729] p-4 rounded-lg w-full md:w-1/2 ">
        <h2 className="text-2xl font-semibold mb-2 text-center">Pricing</h2>
        <p className="text-gray-300 text-center">{service.Price}</p>
      </div>

      {/* Ikony */}
      <div className="flex gap-4 justify-center md:justify-start">
        <Tooltip label="Visit page" position="top" withArrow>
          <Button
            className="rounded-full px-4 py-4 bg-gray-800 hover:bg-gray-700 transition shadow-lg flex items-center justify-center"
            aria-label="Visit Page"
          >
            <LuExternalLink size={24} className="text-white" />
          </Button>
        </Tooltip>
        <Tooltip label="Add to liked services" position="top" withArrow>
          <Button
            className="rounded-full px-4 py-4 bg-gray-800 hover:bg-green-600 transition shadow-lg flex items-center justify-center"
            aria-label="Add to Liked Services"
          >
            <FaHeart size={24} className="text-white" />
          </Button>
        </Tooltip>
      </div>
    </div>
  </div>
</div>
  );
};

export default ServiceDetail;