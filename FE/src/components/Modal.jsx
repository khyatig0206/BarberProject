import React from "react";

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
