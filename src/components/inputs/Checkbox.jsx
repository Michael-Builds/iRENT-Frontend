import React from "react";

const Checkbox = ({ label, checked, onChange, id = "checkbox" }) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 align-center select-none cursor-pointer"
    >
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
        className="h-3 w-3 text-[#d2710a] border-gray-300 rounded focus:ring-[#d2710a]"
      />
      <p className="text-gray-700 text-sm">{label}</p>
    </label>
  );
};

export default Checkbox;
