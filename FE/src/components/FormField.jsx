import React from "react";

const FormField = ({ label, type, placeholder, register, validation, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-coffee focus:outline-none"
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormField;
