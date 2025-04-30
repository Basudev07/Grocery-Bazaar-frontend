import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Slider({ sliderList }) {
  const baseUrl = "http://localhost:1337"; // Change this if needed
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Duplicate slides for infinite effect
  const extendedSlides = [...sliderList, ...sliderList];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === extendedSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Auto-slide every 6 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [extendedSlides.length]);

  // Handle Manual Navigation
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? extendedSlides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === extendedSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative overflow-hidden">
      <Carousel>
        <CarouselContent
          ref={sliderRef}
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 1s ease-in-out",
          }}
        >
          {extendedSlides.map((slider, index) => {
            const imagePath = slider.image?.[0]?.url;
            if (!imagePath) return null;

            const imageUrl = `${baseUrl}${imagePath}`;

            return (
              <CarouselItem key={index} className="min-w-full">
                <Image
                  src={imageUrl}
                  width={1000}
                  height={400}
                  alt="slider"
                  className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious onClick={handlePrev} />
        <CarouselNext onClick={handleNext} />
      </Carousel>
    </div>
  );
}

export default Slider;
