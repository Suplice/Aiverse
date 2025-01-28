import React, { useEffect, useState } from 'react';

const ServiceGallery = ({ galleryImages }: { galleryImages: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevImage = () => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="relative flex items-center justify-center w-full">
      {galleryImages.length > 0 && (
        <>
          <button
            className="absolute left-0 z-10 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
            onClick={prevImage}
          >
            &lt;
          </button>
          <button
            className="absolute right-0 z-10 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
            onClick={nextImage}
          >
            &gt;
          </button>
        </>
      )}
  
      <div className="w-full max-w-lg overflow-hidden">
        {galleryImages.length === 0 ? (
          <div className="text-center text-gray-400">No images provided</div>
        ) : (
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_API_URL}${image}`}
                alt={`Gallery ${index + 1}`}
                className="w-full flex-shrink-0"
              />
            ))}
          </div>
        )}
      </div>
    </div>
    );
    };

export default ServiceGallery;