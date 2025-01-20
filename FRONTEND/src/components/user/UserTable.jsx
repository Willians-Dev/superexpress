import React from "react";

const UserTable = ({ users, onDelete, onEdit, onEditPassword }) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Correo</th>
          <th className="border px-4 py-2">Rol</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.usuario_id}>
            <td className="border px-4 py-2">{`${user.nombre} ${user.apellido}`}</td>
            <td className="border px-4 py-2">{user.correo}</td>
            <td className="border px-4 py-2">{user.rol_id === 1 ? "Administrador" : "Usuario"}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => onEditPassword(user)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Cambiar Contraseña
              </button>
              <button
                onClick={() => onDelete(user.usuario_id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;