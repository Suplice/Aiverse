import React from "react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  return (
    <div className="file-upload mb-4">
      <label htmlFor="file" className="block text-sm font-medium mb-2 text-gray-300">
        Upload the picture
      </label>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/*"
        className="w-full bg-[#212325] border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onFileChange(e.target.files?.[0] || null)
        }
        required
      />
    </div>
  );
};

export default FileUpload;
