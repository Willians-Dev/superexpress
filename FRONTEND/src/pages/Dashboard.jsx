import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Obtener el token de localStorage
  
      if (!token) {
        console.error('No se encontró el token');
        return;
      }
  
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Añadir el token en el encabezado
        },
      });
  
      const data = await response.json();
      console.log('Usuarios obtenidos:', data); // Verificar la respuesta en la consola
  
      if (response.ok) {
        setUsers(data);
      } else {
        console.error('Error al obtener los usuarios:', data);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Correo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.usuario_id}>
              <td className="border px-4 py-2">{user.usuario_id}</td>
              <td className="border px-4 py-2">{user.nombre} {user.apellido}</td>
              <td className="border px-4 py-2">{user.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;