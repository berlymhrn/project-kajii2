import React from "react";
import { IconCheck } from "@tabler/icons-react";

function Feature({ featureTitle }) {
    return (
        <ul role="list" className="space-y-3 my-4">
            {featureTitle.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <IconCheck
                        size={20}
                        className="bg-primaryColor text-white rounded-full"
                    />
                    <span className="text-p18 md:text-h5 font-semibold text-gray-800 ms-3">
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default Feature;
