import React, { useState } from "react";

const FormInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="form-input mb-4">
      {/* Title */}
      <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-300">
        Title
      </label>
      <textarea
        id="title"
        name="title"
        className="w-full bg-[#212325] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-11"
        maxLength={40}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="text-sm text-gray-400">
        {title.length} / 40
      </div>

      {/* Description */}
      <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-300">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="w-full bg-[#212325] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-auto h-28"
        maxLength={100}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="text-sm text-gray-400">
        {description.length} / 100
      </div>

      {/* Full Description */}
      <label htmlFor="full_description" className="block text-sm font-medium mb-2 text-gray-300">
        Full Description
      </label>
      <textarea
        id="full_description"
        name="full_description"
        className="w-full bg-[#212325] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-36"
        maxLength={300}
        value={fullDescription}
        onChange={(e) => setFullDescription(e.target.value)}
        required
      />
      <div className="text-sm text-gray-400">
        {fullDescription.length} / 300
      </div>

      {/* Price */}
      <label htmlFor="price" className="block text-sm font-medium mb-2 text-gray-300">
        Price
      </label>
      <input
        type="number"
        id="price"
        name="price"
        className="w-full bg-[#212325] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
    </div>
  );
};

export default FormInput;