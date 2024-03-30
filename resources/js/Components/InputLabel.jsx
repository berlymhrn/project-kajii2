import React from "react";

function InputLabel({ labelFor, labelText }) {
    return (
        <div>
            <label
                htmlFor={labelFor}
                className="block mb-2 text-p18 font-medium text-gray-900"
            >
                {labelText}
            </label>
        </div>
    );
}

export default InputLabel;
