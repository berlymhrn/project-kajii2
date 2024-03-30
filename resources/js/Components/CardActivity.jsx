import React from "react";

function CardActivity({ image, title, price, action }) {
    return (
        <div className="relative">
            <img
                className="w-72 h-80 md:h-96 object-cover rounded-xl brightness-75"
                src={image}
                alt="Image Activity"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h4 className="font-bold text-white text-2xl md:text-3xl mb-2 mx-5">
                    {title}
                </h4>
                <h4 className="text-white font-medium text-h5 mb-10 mx-5">
                    {price}
                </h4>
                <div className="absolute bottom-6 left-0 right-0">{action}</div>
            </div>
        </div>
    );
}

export default CardActivity;
