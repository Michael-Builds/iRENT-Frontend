import React from "react";

export const DatePicker = ({
    label,
    value,
    onChange,
    placeholder = "Select a date",
    error,
    minDate,
    maxDate
}) => {
    return (
        <div className="mb-4">
            {/* Label */}
            {label && (
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                    {label}
                </label>
            )}

            {/* Date Input */}
            <div className="relative">
                <input
                    type="date"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={minDate}
                    max={maxDate}
                    className={`block text-sm w-full px-4 py-2.5 border font-nunito rounded-sm shadow-sm focus:outline-none focus:ring-0 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                        }`}
                />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};
