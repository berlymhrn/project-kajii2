import React from "react";

function TextInput({ inputType, inputId, onChange, className }) {
    return (
        <div>
            <input
                id={inputId}
                type={inputType}
                className={`block w-full p-2 text-gray-900 border rounded-lg bg-gray-50 text-p16 focus:ring-green-500 focus:border-green-500 ${className}`}
                onChange={onChange}
            />
        </div>
    );
}

export default TextInput;
