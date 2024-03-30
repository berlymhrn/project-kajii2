import React from "react";

function Timeline({ date, title, description, imgSrc }) {
    return (
        <li className="mb-10 ms-4 relative">
            <div className="relative">
                <div className="absolute left-[-23px] top-[6px] w-3 h-3 bg-primaryColor rounded-full border border-white z-10"></div>
                <time className="mb-1 text-p16 md:p-18 font-medium leading-none text-black ">
                    {date}
                </time>
                <h3 className="text-p18 md-h5 font-semibold text-gray-900 ">
                    {title}
                </h3>
                <p className="mb-4 text-p16 font-normal text-gray-500 ">
                    {description}
                </p>
                <img
                    src={imgSrc}
                    alt="timeline image"
                    className="w-36 h-36 object-cover rounded-lg"
                />
            </div>
        </li>
    );
}

export default Timeline;
