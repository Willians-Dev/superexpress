//FRONTEND\src\layouts\UserLayout.jsx
import React, { useState, useEffect } from 'react';
import UserTable from '../components/user/UserTable';
import CreateUserForm from '../components/user/CreateUserForm';

const UserLayout = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ nombre: '', apellido: '', correo: '', contrasena: '', rol_id: '' });
  const [showForm, setShowForm] = useState(false); // Controla la visibilidad del formulario

  // Fetch users and roles
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const userResponse = await fetch('http://localhost:5000/api/usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const roleResponse = await fetch('http://localhost:5000/api/roles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok || !roleResponse.ok) throw new Error('Error al obtener datos');
        setUsers(await userResponse.json());
        setRoles(await roleResponse.json());
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleCreateUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error('Error al crear el usuario');
      const createdUser = await response.json();
      setUsers([...users, createdUser]);
      setNewUser({ nombre: '', apellido: '', correo: '', contrasena: '', rol_id: '' });
      setShowForm(false); // Oculta el formulario tras crear el usuario
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al eliminar usuario');
      setUsers(users.filter((user) => user.usuario_id !== userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRoleChange = (userId, newRoleId) => {
    setUsers(users.map((user) => (user.usuario_id === userId ? { ...user, rol_id: newRoleId } : user)));
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>

      {/* Botón para mostrar/ocultar el formulario */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-4 py-2 rounded text-white ${
            showForm ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {showForm ? 'Cancelar' : 'Crear Usuario'}
        </button>
      </div>

      {/* Formulario dinámico */}
      {showForm && (
        <div className="bg-white p-6 shadow-md rounded-md mb-6">
          <h2 className="text-lg font-bold mb-4">Crear Nuevo Usuario</h2>
          <CreateUserForm
            newUser={newUser}
            setNewUser={setNewUser}
            roles={roles}
            handleCreateUser={handleCreateUser}
          />
        </div>
      )}

      {/* Tabla de usuarios */}
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-4">Lista de Usuarios</h2>
        <UserTable
          users={users}
          roles={roles}
          handleRoleChange={handleRoleChange}
          handleDelete={handleDeleteUser}
        />
      </div>
    </div>
  );
};

export default UserLayout;