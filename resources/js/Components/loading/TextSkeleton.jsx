import React from "react";

function TextSkeleton() {
    return (
        <div className="animate-pulse mb-5">
            <div className="bg-gray-300 h-6 w-full mb-2 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-2/3 mb-2 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-5/6 mb-2 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-4/6 mb-2 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-1/4 rounded-full"></div>
        </div>
    );
}

export default TextSkeleton;
