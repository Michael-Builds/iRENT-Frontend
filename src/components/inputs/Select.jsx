import React from "react";
import Select from "react-select";

export const CustomSelect = ({ options, placeholder, onChange, value, isMulti }) => {
    return (
        <Select
            options={options}
            placeholder={placeholder || "Select..."}
            value={value}
            onChange={onChange}
            isMulti={isMulti}
            className="w-full text-sm"
            styles={{
                control: (provided) => ({
                    ...provided,
                    width: "100%",
                    padding: "0.1rem",
                    outline: "none",
                    boxShadow: "none",
                    borderColor: "#d1d5db",
                    "&:hover": {
                        borderColor: "#d1d5db",
                    },
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#d2710a" : "#fff",
                    fontSize: "12px",
                    "&:hover": {
                        backgroundColor: "#d2710a",
                        color: "#fff",
                    },
                }),
            }}
        />
    );
};
