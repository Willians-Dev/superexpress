import React, { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal'; // Asegúrate de la ruta correcta
import DashboardLayout from '../layouts/DashboardLayout';  // Importamos el Layout con Sidebar y Header

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token almacenado

        if (!token) {
          throw new Error('No se encontró el token');
        }

        const response = await fetch('http://localhost:5000/api/usuarios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error al obtener los usuarios');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No se encontró el token');
        }

        const response = await fetch('http://localhost:5000/api/roles', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error al obtener los roles');
        const data = await response.json();
        setRoles(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No se encontró el token');
      }

      await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.usuario_id !== userId));
    } catch (err) {
      setError('Error al eliminar el usuario');
    }
  };

  const handleSave = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmSave = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No se encontró el token');
      }

      await fetch(`http://localhost:5000/api/usuarios/${selectedUser.usuario_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });
      setShowModal(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Error al guardar los cambios');
    }
  };

  const handleRoleChange = (userId, newRoleId) => {
    setUsers(
      users.map((user) =>
        user.usuario_id === userId ? { ...user, rol_id: newRoleId } : user
      )
    );
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Rol</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.usuario_id}>
              <td className="border px-4 py-2">{user.usuario_id}</td>
              <td className="border px-4 py-2">{user.nombre} {user.apellido}</td>
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
                  onClick={() => handleDeleteUser(user.usuario_id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ConfirmModal
          user={selectedUser}
          onConfirm={confirmSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default Usuarios;