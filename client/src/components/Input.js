import React, { useEffect, useState } from 'react';

const Input = ({
  label,
  type,
  handleChange,
  name,
  value,
  isRequired,
  error,
  handleBlur,
}) => {
  return (
    <div className="group flex flex-col flex-1 w-full gap-1">
      {/* <label
        htmlFor={label}
        className={`  text-gray-dark text-sm font-normal group-hover:text-green-light group-focus-within:text-green-light transition-all duration-200 ${
          error && 'text-red-400'
        }`}
      >
        {label} {isRequired && '*'}
      </label> */}
      <input
        onChange={handleChange}
        name={name}
        onBlur={handleBlur}
        value={value}
        className={`bg-gray-light  transition-all duration-200 border-2 border-gray-300 rounded-lg px-3 py-2 outline-none hover:border-green-light focus:border-green-light focus:bg-white ${
          error && 'border-red-400'
        }`}
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
        id={label}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
