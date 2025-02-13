import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const images = [
  "/02e9154a-30e4-4d71-8c90-a834833b60cb.png",
  "/5535e59a-3326-45ae-b20d-59504b6b5f4a.png",
  "/29926b03-3159-43fd-821f-a586a8285d11.png",
];

const AppPreview = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const getImagePosition = (index: number) => {
    if (index === imgIndex) return "z-10 scale-100";
    if ((index + 1) % images.length === imgIndex)
      return "-translate-x-20 lg:-translate-x-24 xl:-translate-x-40 z-0 scale-75 opacity-70";
    if ((index - 1 + images.length) % images.length === imgIndex)
      return "translate-x-20 lg:translate-x-24 xl:translate-x-40 z-0 scale-75 opacity-70";
    return "hidden";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col w-full h-full items-center  justify-center relative">
      <div className="relative w-[380px]  h-[380px] flex items-center justify-center">
        {images.map((image, index) => (
          <motion.img
            draggable={false}
            key={index}
            src={image}
            className={`absolute rounded-lg shadow-2xl lg:w-[400px] md:w-[250px] aspect-auto transition-all duration-500 select-none ${getImagePosition(
              index
            )}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ))}
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex flex-row items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setImgIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                imgIndex === index ? "bg-black" : "bg-slate-200"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
