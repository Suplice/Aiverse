import React from "react";
import { AIServiceFormData } from "../../Utils/Models/AIServiceFormData";

interface FormInputProps {
  formData: AIServiceFormData;
  onChange: (name: keyof AIServiceFormData, value: string | File | null) => void;
}


const FormInput: React.FC<FormInputProps> = ({ formData, onChange }) => {
  return (
    <div className="form-input mb-4">
      <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-300">
        Title
      </label>
      <textarea
        id="title"
        name="title"
        className="w-full bg-[#212325] border mb-2 border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-11"
        maxLength={40}
        value={formData.Title}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange("Title", e.target.value)
        }
        required
      />
      <div className="text-sm text-gray-400 mb-2">{formData.Title.length} / 40</div>

      <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-300">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="w-full bg-[#212325] border mb-2 border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-auto h-28"
        maxLength={100}
        value={formData.Description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange("Description", e.target.value)
        }
        required
      />
      <div className="text-sm text-gray-400 mb-2">{formData.Description.length} / 100</div>

      <label htmlFor="full_description" className="block text-sm font-medium mb-2 text-gray-300">
        Full Description
      </label>
      <textarea
        id="full_description"
        name="full_description"
        className="w-full bg-[#212325] border mb-2 border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-36"
        maxLength={300}
        value={formData.FullDescription}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange("FullDescription", e.target.value)
        }
        required
      />
      <div className="text-sm text-gray-400 mb-2 ">{formData.FullDescription.length} / 300</div>

      <label htmlFor="price" className="block text-sm font-medium mb-2 text-gray-300">
        Price
      </label>
      <input
        type="text"
        id="price"
        name="price"
        className="w-full mb-2 bg-[#212325] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={formData.Price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange("Price", e.target.value)
        }
        required
      />
      <label htmlFor="service_url" className="block text-sm font-medium mb-2 text-gray-300">
        Service URL
      </label>
      <input
        type="text"
        id="service_url"
        name="service_url"
        className="w-full bg-[#212325] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={formData.ServiceURL}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange("ServiceURL", e.target.value)
        }
        required
      />
    </div>
  );
};

export default FormInput;
