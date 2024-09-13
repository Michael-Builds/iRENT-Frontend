import React from "react";

const AlternateLoginButton = ({ src, alt, text, height, width, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border gap-4 border-gray-600 w-full py-2 px-4 flex items-center justify-center"
    >
      <img src={src} alt={alt} height={height} width={width} />
      <p className="text-sm">{text}</p>
    </button>
  );
};

export default AlternateLoginButton;
