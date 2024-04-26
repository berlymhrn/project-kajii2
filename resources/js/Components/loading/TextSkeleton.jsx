import React from "react";
function TextSkeleton() {
    return (
        <div className="flex animate-pulse">
            <div className="mt-2 mb-7 w-full">
                <ul className="mt-5 space-y-3">
                    <li className="w-11/12 h-6 bg-gray-200 rounded-full"></li>
                    <li className="w-10/12 h-6 bg-gray-200 rounded-full"></li>
                    <li className="w-3/4 h-6 bg-gray-200 rounded-full"></li>
                    <li className="w-2/3 h-6 bg-gray-200 rounded-full"></li>
                    <li className="w-1/3 h-6 bg-gray-200 rounded-full"></li>
                </ul>
            </div>
        </div>
    );
}

export default TextSkeleton;

