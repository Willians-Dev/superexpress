// FRONTEND/src/components/UserInfo.jsx
import React from 'react';
import LogoutButton from './LogoutButton';

const UserInfo = () => {
  let user = null;

  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Error al parsear datos del usuario:', error);
    localStorage.removeItem('user');
  }

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Usuario';
      default:
        return 'Rol no especificado';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const initials = user?.nombre && user?.apellido
    ? `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase()
    : '?';

  return (
    <div className="flex items-center justify-between p-4 bg-blue-700 rounded-md">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
          {initials}
        </div>
        <div>
          <p className="text-white font-medium">{user ? `${user.nombre} ${user.apellido}` : 'Usuario'}</p>
          <p className="text-sm text-gray-300">{user?.rol_id ? getRoleName(user.rol_id) : 'Rol no especificado'}</p>
        </div>
      </div>
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default UserInfo;