// FRONTEND/src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import { ButtonsInfo } from '../types/ButtonsInfo';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col h-screen p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Panel de Control</h2>
      </div>

      {/* Enlaces del Sidebar */}
      <nav className="flex flex-col space-y-2 mb-auto">
        {ButtonsInfo.map((button) => (
          <Link
            to={button.path}
            key={button.name}
            className="hover:bg-blue-700 px-4 py-2 rounded"
          >
            {button.name}
          </Link>
        ))}
      </nav>

      {/* Información del Usuario */}
      <UserInfo />
    </div>
  );
};

export default Sidebar;