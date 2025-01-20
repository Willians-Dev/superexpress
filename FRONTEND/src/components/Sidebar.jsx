import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import { ButtonsInfo } from '../types/ButtonsInfo';

const Sidebar = () => {
  const userString = localStorage.getItem('user');
  let user = null;

  try {
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error('Error al analizar el usuario de localStorage:', error);
  }

  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col min-h-screen overflow-y-auto shadow-lg">
      <div className="p-4 bg-blue-900 shadow-md">
        <h2 className="text-lg font-bold text-center">Panel de Control</h2>
      </div>

      <nav className="flex flex-col mt-4 space-y-2 px-4">
        {ButtonsInfo.map((button) => {
          if (button.allowedRoles && (!user || !button.allowedRoles.includes(user.rol_id))) {
            return null;
          }
          return (
            <Link
              to={button.path}
              key={button.name}
              className="px-4 py-2 rounded text-white hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              {button.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 border-t border-blue-700 bg-blue-900">
        <UserInfo />
      </div>
    </div>
  );
};

export default Sidebar;