import React, { useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "./GalleryUpload.css";
import { GalleryImages } from "../../../Utils/Models/ImageGallery";

interface FileUploadProps {
  onFileChange: (files: GalleryImages) => void;
}

const GalleryUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [, setFiles] = useState<GalleryImages>([]);

  const uppy = new Uppy({
    restrictions: {
      allowedFileTypes: [".jpg", ".png", ".jpeg"],
    },
  });

  const handleChange = () => {
    const currentFiles = uppy.getFiles();

    const images: GalleryImages = currentFiles.map((file) => file.data);

    onFileChange(images);
    setFiles(images);
  };

  uppy.on("upload", handleChange);

  return (
    <>
      <label
        htmlFor="file"
        className="block text-sm font-medium mb-2 text-gray-300"
      >
        Upload Gallery Images
      </label>
      <Dashboard
        uppy={uppy}
        theme="dark"
        className="md:w-4/5 mx-auto border-none shadow-xl shadow-black/30"
      />
    </>
  );
};

export default GalleryUpload;
