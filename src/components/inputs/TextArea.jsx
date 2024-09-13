import React from 'react';

export const Textarea = ({ label, placeholder, value, onChange, error }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
                {label}
            </label>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`block text-sm w-full px-4 py-2.5 border rounded-sm shadow-sm focus:outline-none focus:ring-0 ${error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-0'
                    }`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};
