// CarouselComponent.jsx
import React from "react";
import { Carousel } from "flowbite-react";
import { IconChevronLeft } from "@tabler/icons-react";
import { IconChevronRight } from "@tabler/icons-react";

function CarouselComponent({ images, limit }) {
    const limitedImages = images.slice(0, limit);

    return (
        <div className="h-56 md:h-96">
            <Carousel
                leftControl={
                    <IconChevronLeft
                        size={40}
                        className="bg-gray-700 bg-opacity-50 rounded-full text-white"
                    />
                }
                rightControl={
                    <IconChevronRight
                        size={40}
                        className="bg-gray-700 bg-opacity-50 rounded-full text-white"
                    />
                }
            >
                {limitedImages.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt={`image ${index}`}
                        className="object-cover"
                    />
                ))}
            </Carousel>
        </div>
    );
}

export default CarouselComponent;
