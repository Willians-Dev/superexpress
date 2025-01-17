// FRONTEND/src/components/user/UserProfile.jsx
import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/usuarios/${user.usuario_id}/password`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña.');
      }

      setSuccess('Contraseña actualizada con éxito.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Hubo un error al cambiar la contraseña.');
    }
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Perfil del Usuario</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600">Nombre</label>
          <p className="text-gray-800 font-medium">{user.nombre}</p>
        </div>
        <div>
          <label className="block text-gray-600">Apellido</label>
          <p className="text-gray-800 font-medium">{user.apellido}</p>
        </div>
        <div>
          <label className="block text-gray-600">Correo Electrónico</label>
          <p className="text-gray-800 font-medium">{user.correo}</p>
        </div>
      </div>

      <form onSubmit={handlePasswordChange} className="mt-6 space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-gray-600">Nueva Contraseña</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-600">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default UserProfile;