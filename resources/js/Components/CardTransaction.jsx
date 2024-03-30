import React from "react";
import { Link } from "@inertiajs/react";

function CardTransaksi({
    img,
    header,
    time,
    title,
    smallTitle,
    action,
    anotherAction,
    titleTruncatedFont,
}) {
    const truncatedTitle =
        title.length > 140 ? title.slice(0, 140) + "..." : title;

    return (
        <div className="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100">
            <img
                className="object-cover w-full rounded-t-lg h-full md:h-72 md:w-72 md:rounded-none md:rounded-s-lg"
                src={img}
                alt="image"
            />
            <div className="flex flex-col justify-between w-full px-6 py-2">
                <div className="p-5 leading-normal">
                    <h5 className=" text-2xl font-bold tracking-tight">
                        {header}
                    </h5>
                    <p className="mb-8 font-medium text-p16 text-gray-500">
                        {time}
                    </p>
                    <p
                        className={`${titleTruncatedFont} mb-10 font-bold text-h5`}
                    >
                        {truncatedTitle}
                    </p>
                    <div className="w-full flex flex-wrap justify-between">
                        <p className="inline-flex items-center justify-center font-medium text-p16 text-gray-700">
                            {smallTitle}
                        </p>
                        <div className="flex justify-end">
                            <div>{action}</div>
                            <div>{anotherAction}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardTransaksi;
