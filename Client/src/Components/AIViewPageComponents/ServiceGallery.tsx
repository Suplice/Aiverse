import React, { useState } from 'react';

const ServiceGallery = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevImage = () => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="relative flex items-center justify-center w-full">
        {/* Left button */}
        <button
          className="absolute left-0 z-10 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
          onClick={prevImage}
        >
          &lt;
        </button>
  
        {/* Image container */}
        <div className="w-full max-w-lg overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full flex-shrink-0"
              />
            ))}
          </div>
        </div>
  
        {/* Right button */}
        <button
          className="absolute right-0 z-10 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
          onClick={nextImage}
        >
          &gt;
        </button>
      </div>
    );
    };

export default ServiceGallery;