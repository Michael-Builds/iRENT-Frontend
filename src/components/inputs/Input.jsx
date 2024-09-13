import React, { useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { PiEyeLight } from "react-icons/pi";

export const Input = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    error,
    icon,
    togglePassword,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Toggle password visibility
    const handlePasswordToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </span>
                )}
                <input
                    type={type === "password" && isPasswordVisible ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    required
                    onChange={onChange}
                    autoComplete={type === "email" ? "email" : (type === "password" ? (togglePassword ? "new-password" : "current-password") : undefined)}
                    className={`block text-sm w-full px-4 py-2.5 border rounded-sm shadow-sm focus:outline-none focus:ring-0 ${icon ? "pl-10" : "pl-4"
                        } ${error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-0 "
                        }`}

                />
                {/* Conditionally render the password toggle icon */}
                {togglePassword && type === "password" && (
                    <span
                        onClick={handlePasswordToggle}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                        {isPasswordVisible ? (
                            <PiEyeLight size={18} />
                        ) : (
                            <RxEyeClosed size={18} />
                        )}
                    </span>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

