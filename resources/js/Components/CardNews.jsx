import React from "react";

function CardBerita({ img, title, article, time }) {
    return (
        <div className="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100">
            <img
                className="object-cover w-full rounded-t-lg h-40 md:h-72- md:w-72 md:rounded-none md:rounded-s-lg"
                src={img}
                alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">{article}</p>
                <p className="mb-3 font-normal text-gray-700">{time}</p>
            </div>
        </div>
    );
}

export default CardBerita;
