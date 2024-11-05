// FRONTEND/src/components/UserInfo.jsx
import React from 'react';

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

  // Verifica que el usuario exista y obtén las iniciales
  const initials = user?.nombre && user?.apellido
    ? `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase()
    : '?';

  return (
    <div className="flex items-center p-4 bg-blue-700 rounded-md mt-auto">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mr-3">
        {initials}
      </div>
      <div>
        <p className="text-white font-medium">{user ? `${user.nombre} ${user.apellido}` : 'Usuario'}</p>
        <p className="text-sm text-gray-300">{user?.rol_id ? getRoleName(user.rol_id) : 'Rol no especificado'}</p>
      </div>
    </div>
  );
};

export default UserInfo;