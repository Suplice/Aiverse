import React from 'react';


interface Service {
  Image: string;
  Title: string;
  Stars: number;
  Reviews: number;
  Description: string;
  Price: string;
}

const ServiceDetail: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="bg-[#121212] text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img src={service.Image} alt={service.Title} className="rounded-lg shadow-lg" />
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
      </div>
    </div>
  );
};

export default ServiceDetail;