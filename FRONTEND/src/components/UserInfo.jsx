// FRONTEND/src/components/UserInfo.jsx
import React from 'react';
import LogoutButton from './LogoutButton';

const UserInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Función para obtener el nombre del rol según el `rol_id`
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

  // Función de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Verifica que el usuario exista y obtén las iniciales
  const initials = user?.nombre && user?.apellido
    ? `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase()
    : '?';

  return (
    <div className="flex items-center justify-between p-4 bg-blue-700 rounded-md mt-auto">
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