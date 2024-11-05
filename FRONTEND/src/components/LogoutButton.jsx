// FRONTEND/src/components/LogoutButton.jsx
import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="text-red-500 hover:text-red-700 bg-white border border-gray-300 p-1 rounded-md"
      aria-label="Cerrar sesión"
    >
      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
    </button>
  );
};

export default LogoutButton;