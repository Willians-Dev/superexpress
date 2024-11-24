import React from 'react';

const UserTable = ({ users, roles, handleRoleChange, handleSave, handleDelete, handlePasswordChange }) => (
    <table className="table-auto w-full mb-6">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Correo</th>
          <th className="px-4 py-2">Rol</th>
          <th className="px-4 py-2">Acciones</th>
          <th className="px-4 py-2">Contraseña</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((user) => user && user.usuario_id) // Filtra usuarios nulos o con datos inválidos
          .map((user) => (
            <tr key={user.usuario_id}>
              <td className="border px-4 py-2">{user.usuario_id}</td>
              <td className="border px-4 py-2">
                {user.nombre} {user.apellido}
              </td>
              <td className="border px-4 py-2">{user.correo}</td>
              <td className="border px-4 py-2">
                <select
                  value={user.rol_id || ''}
                  onChange={(e) => handleRoleChange(user.usuario_id, e.target.value)}
                  className="p-2 rounded-md border border-gray-300"
                >
                  <option value="">Seleccione un rol</option>
                  {roles.map((rol) => (
                    <option key={rol.rol_id} value={rol.rol_id}>
                      {rol.rol_nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2"
                  onClick={() => handleSave(user)}
                >
                  Guardar
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded-md"
                  onClick={() => handleDelete(user.usuario_id)}
                >
                  Eliminar
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md"
                  onClick={() => handlePasswordChange(user)}
                >
                  Cambiar Contraseña
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
  
export default UserTable;