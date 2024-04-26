import React from "react";

function Alert() {
    return (
        <div className="space-y-5">
            <div
                className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4"
                role="alert"
            >
                <div className="flex">
                    <div className="flex-shrink-0">
                        <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800">
                            <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                        </span>
                    </div>
                    <div className="ms-3">
                        <h3 className="text-gray-800 font-semibold">
                            Successfully updated.
                        </h3>
                        <p className="text-sm text-gray-700">
                            You have successfully updated your email
                            preferences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alert;
