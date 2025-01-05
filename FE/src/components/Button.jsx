import React from "react";

const Button = ({ type, label, isLoading, onClick }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className="w-full bg-brown text-white py-2 rounded-lg hover:bg-coffee transition disabled:opacity-50"
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
