import React from "react";

function Card({
    imageSrc,
    title,
    duration,
    description,
    price,
    action,
    note,
    height,
}) {
    return (
        <div
            className={` ${height} stroke-gray-500 shadow-lg rounded-xl w-72 pb-10`}
        >
            <img
                className="w-full h-52 object-cover rounded-t-lg"
                src={imageSrc}
                alt={title}
            />
            <div className="px-6 py-4">
                <h5 className="font-bold text-black text-h5 flex justify-center">
                    {title}
                </h5>
                <p className="font-medium text-p16 text-gray-500 flex justify-center">
                    {duration}
                </p>
                <p className="text-black text-base mt-5">{description}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h5 className="font-bold text-h5">IDR {price}</h5>
                <div className="mt-2">{action}</div>
            </div>
            <p className="pl-8 text-gray-500">{note}</p>
        </div>
    );
}

export default Card;
