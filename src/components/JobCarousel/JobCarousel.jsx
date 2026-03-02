import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const JobCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation functions
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-play logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Changes every 5 seconds

    // Cleanup function to prevent memory leaks and overlapping intervals
    return () => clearInterval(slideInterval);
  }, [currentIndex]); // Restarts the timer whenever the index changes

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1200px] w-full m-auto py-12 px-4 relative group">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
        Our Recent Work
      </h2>

      {/* Main Image Container */}
      <div className="relative w-full h-[300px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-200 shadow-xl">
        {images.map((img, index) => (
          <div>
            <img
              key={index}
              src={img.url}
              alt={img.title}
              className={`absolute top-0 left-0 w-full h-full object-contain duration-700 ease-in-out transition-all ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-[50%] -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors z-10"
        >
          <ChevronLeft size={30} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-[50%] -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors z-10"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Thumbnail Preview Strip */}
      <div className="flex justify-center mt-6 gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer transition-all duration-300 rounded-md overflow-hidden border-2 flex-shrink-0
              ${index === currentIndex ? "border-blue-600 scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"}
            `}
          >
            <img
              src={img.url}
              alt={`thumbnail-${index}`}
              className="w-16 h-12 md:w-24 md:h-16 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCarousel;
