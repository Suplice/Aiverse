import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const previewImages = [
  "/02e9154a-30e4-4d71-8c90-a834833b60cb.png",
  "/5535e59a-3326-45ae-b20d-59504b6b5f4a.png",
  "/29926b03-3159-43fd-821f-a586a8285d11.png",
];

const AppPreview = () => {
  const [imgIndex, setImgIndex] = useState(0);

  /**
   * `handleNext` function increments the image index to display the next image.
   * It also handles the circular transition effect.
   * @function handleNext
   * @returns {void}
   */
  const handleNext = () => {
    setImgIndex((prev) => (prev + 1) % previewImages.length);
  };

  /**
   * `getImagePosition` function returns the position of the image based on the index.
   * It returns the position of the image based on the current image index.
   *
   * @function getImagePosition
   * @param {number} index - Image Index
   * @returns {string} Image Position
   */
  const getImagePosition = (index: number) => {
    if (index === imgIndex) return "z-10 scale-100";
    if ((index + 1) % previewImages.length === imgIndex)
      return "-translate-x-20 lg:-translate-x-24 xl:-translate-x-40 z-0 scale-75 opacity-70";
    if ((index - 1 + previewImages.length) % previewImages.length === imgIndex)
      return "translate-x-20 lg:translate-x-24 xl:translate-x-40 z-0 scale-75 opacity-70";
    return "hidden";
  };

  /**
   * `useEffect` hook to handle the automatic image transition.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col w-full h-full items-center  justify-center relative">
      <div className="relative w-[380px]  h-[380px] flex items-center justify-center">
        {previewImages.map((image, index) => (
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
          {previewImages.map((_, index) => (
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
