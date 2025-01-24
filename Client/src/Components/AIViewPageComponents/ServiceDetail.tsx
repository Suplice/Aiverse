import React, { useEffect } from 'react';
import { AiService } from '../../Utils/Models/AiService';

const ServiceDetail: React.FC<{ service: AiService }> = ({ service }) => {
  useEffect(() => {
     console.log(service);
  }, []);

  return (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img src="https://picsum.photos/id/593/600/600" alt={service.Title} className="rounded-lg shadow-lg max-w-9/12" />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{service.Title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-2xl">{"★".repeat(Math.floor(service.Stars))}</span>
              <span className="text-gray-400 text-2xl">{"★".repeat(5 - Math.floor(service.Stars))}</span>
              <span className="ml-2 text-gray-400">({service.Reviews} reviews)</span>
            </div>
            <p className="text-gray-300 mb-4">{service.Description}</p>
            <div className="bg-[#252729] p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
              <p className="text-gray-300">{service.Price}</p>
            </div>
          </div>
        </div>
  );
};

export default ServiceDetail;