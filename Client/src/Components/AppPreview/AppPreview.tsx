import { motion } from "framer-motion";
import React, { useState } from "react";

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

  const handlePrev = () => {
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getImagePosition = (index: number) => {
    if (index === imgIndex) return "z-10 scale-100";
    if ((index + 1) % images.length === imgIndex)
      return "-translate-x-20 lg:-translate-x-24 xl:-translate-x-40 z-0 scale-75 opacity-70";
    if ((index - 1 + images.length) % images.length === imgIndex)
      return "translate-x-20 lg:translate-x-24 xl:translate-x-40 z-0 scale-75 opacity-70";
    return "hidden";
  };

  return (
    <div className="flex flex-col w-full h-full items-center gap-10 justify-center relative">
      <div className="relative w-[400px]  h-[400px] flex items-center justify-center">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            className={`absolute rounded-lg shadow-2xl lg:w-[400px] md:w-[270px] transition-all duration-500 ${getImagePosition(
              index
            )}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ))}
      </div>
      <div className="flex gap-5 items-center">
        <button
          onClick={handlePrev}
          className="px-2 py-1 rounded-full bg-slate-200 hover:bg-slate-300 transition-all"
        >
          &#8592;
        </button>
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
        <button
          onClick={handleNext}
          className="px-2 py-1 rounded-full bg-slate-200 hover:bg-slate-300 transition-all"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default AppPreview;
