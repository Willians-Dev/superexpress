import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Necesitamos esto para redirigir
import DashboardLayout from '../layouts/DashboardLayout'; // Asegúrate de la ruta correcta

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    navigate('/'); // Redirigir al login
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Obtener el token de localStorage
  
      if (!token) {
        console.error('No se encontró el token');
        navigate('/'); // Redirigir al login si no hay token
        return;
      }
  
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Añadir el token en el encabezado
        },
      });
  
      const data = await response.json();
        
      if (response.ok) {
        setUsers(data);
      } else {
        console.error('Error al obtener los usuarios:', data);
      }
    };
  
    fetchUsers();
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

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
    </DashboardLayout>
  );
};

export default Dashboard;