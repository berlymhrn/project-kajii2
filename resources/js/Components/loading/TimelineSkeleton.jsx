import React from "react";

function TimelineSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="mb-10 relative">
                <div className="relative">
                    <div className="bg-gray-300 h-6 w-1/4 mb-2 rounded-full"></div>
                    <div className="bg-gray-300 h-6 w-2/3 mb-2 rounded-full"></div>
                    <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded-full"></div>
                    <div className="bg-gray-300 w-36 h-36 object-cover rounded-lg ml-1"></div>
                </div>
            </div>
        </div>
    );
}

export default TimelineSkeleton;
