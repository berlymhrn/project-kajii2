import React from "react";
import { Link } from "@inertiajs/react";

function CustomButton({ text, onClick, linkTo, bgColor, font, width }) {
    return (
        <Link href={linkTo}>
            <button
                className={`${bgColor} ${font} ${width} text-p18 md:text-h5 text-center inline-flex items-center justify-center px-6 py-3 mr-3  text-white rounded-xl `}
                {...{ onClick }}
            >
                {text}
            </button>
        </Link>
    );
}

export default CustomButton;
