import React from "react";
import "./css/Scrollbar.css";

function CardAll({
    img,
    title,
    smallTitle,
    capt,
    price,
    discount,
    feature,
    action,
    textPriceColor,
    titlePosition,
    smallTitlePosition,
}) {
    return (
        <div className="stroke-gray-200 shadow-lg rounded-xl w-72 pb-3 relative">
            <img className="w-full h-52 object-cover rounded-t-lg" src={img} />
            <div className="p-5">
                <div className="mb-10 mx-5">
                    <h5 className={`font-bold text-h5 flex ${titlePosition}`}>
                        {title}
                    </h5>
                    <p
                        className={`font-medium text-p18 text-gray-500 flex ${smallTitlePosition}`}
                    >
                        {smallTitle}
                    </p>
                </div>
                <div className="mb-40 overflow-y-auto max-h-60 custom-scrollbar">
                    <h5 className="font-bold text-h5">{capt}</h5>
                    <span>{feature}</span>
                </div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <div className="flex flex-col justify-center text-gray-900">
                        <span className="text-red-600 font-bold text-p16 line-through">
                            {discount}
                        </span>
                        <span className={`${textPriceColor} font-bold text-h5`}>
                            {price}
                        </span>
                    </div>
                    <div className="mt-2">{action}</div>
                </div>
            </div>
        </div>
    );
}

export default CardAll;
