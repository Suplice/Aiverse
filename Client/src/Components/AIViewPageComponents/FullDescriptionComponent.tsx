import React from "react";

interface FullDescriptionComponentProps {
  FullDescription: string;
}

const FullDescriptionComponent: React.FC<FullDescriptionComponentProps> = ({
  FullDescription,
}) => {
  return (
    <div className="bg-[#252729] p-6 rounded-lg">
      <h2 className="text-gray-300 text-2xl font-semibold mb-4">
        Full Description
      </h2>
      <p className="text-gray-300">{FullDescription}</p>
    </div>
  );
};

export default FullDescriptionComponent;
