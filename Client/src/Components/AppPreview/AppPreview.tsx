import React, { useState } from "react";

const images = [
  "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
  "https://via.assets.so/album.png?id=1&q=95&w=360&h=360&fit=fill",
  "https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill",
];

const AppPreview = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const setIndex = (index: number) => {
    setImgIndex(index);
  };

  return (
    <div className="flex flex-col w-full h-full items-center gap-10 justify-center ">
      <div className="">
        <img src={images[imgIndex]} className="shadow-2xl"></img>
      </div>
      <div className="flex flex-row items-center gap-10 ">
        <button
          onClick={() => setIndex(0)}
          className={`w-20 h-3  rounded-full transition-all duration-200   ${
            imgIndex === 0 ? "bg-black" : "bg-slate-200"
          }`}
        ></button>
        <button
          onClick={() => setIndex(1)}
          className={`w-20 h-3  rounded-full transition-all duration-200  ${
            imgIndex === 1 ? "bg-black" : "bg-slate-200"
          }`}
        ></button>
        <button
          onClick={() => setIndex(2)}
          className={`w-20 h-3  rounded-full transition-all duration-200  ${
            imgIndex === 2 ? "bg-black" : "bg-slate-200"
          }`}
        ></button>
      </div>
    </div>
  );
};

export default AppPreview;
