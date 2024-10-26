import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;