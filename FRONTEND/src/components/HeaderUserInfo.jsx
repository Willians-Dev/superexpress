// FRONTEND/src/components/HeaderUserInfo.jsx
import React from 'react';

const HeaderUserInfo = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtén la información del usuario desde el localStorage

  if (!user) {
    return null; // Si no hay sesión, no muestra nada
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirige al login después del logout
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Nombre y Apellido del Usuario */}
      <span className="text-gray-800 font-medium">
        {`${user.nombre} ${user.apellido}`}
      </span>
      {/* Botón de Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default HeaderUserInfo;