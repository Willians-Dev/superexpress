// FRONTEND/src/components/user/UserTable.jsx
import React from "react";

const UserTable = ({ users, onDelete, onEdit, onEditPassword }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr className="text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Correo</th>
            <th className="py-3 px-6 text-center">Rol</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr key={user.usuario_id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{`${user.nombre} ${user.apellido}`}</td>
              <td className="py-3 px-6 text-left">{user.correo}</td>
              <td className="py-3 px-6 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.rol_id === 1 ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                }`}>
                  {user.rol_id === 1 ? "Administrador" : "Usuario"}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onEditPassword(user)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
                  >
                    Cambiar Contraseña
                  </button>
                  <button
                    onClick={() => onDelete(user)} // ✅ Pasamos el usuario completo
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;