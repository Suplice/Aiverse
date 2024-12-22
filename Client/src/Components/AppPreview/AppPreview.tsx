import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const images = [
  "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
  "https://via.assets.so/album.png?id=1&q=95&w=360&h=360&fit=fill",
  "https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill",
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
    <div className="flex flex-col w-full h-full items-center gap-10 justify-center relative">
      <div className="relative w-[380px]  h-[380px] flex items-center justify-center">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            className={`absolute rounded-lg shadow-2xl lg:w-[400px] md:w-[250px] transition-all duration-500 ${getImagePosition(
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
