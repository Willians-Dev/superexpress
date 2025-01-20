//FRONTEND\src\components\user\UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !userData) {
      console.warn('Sesión no encontrada. Redirigiendo al login...');
      navigate('/');
    } else {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error al analizar datos del usuario:', error);
        localStorage.removeItem('user');
        navigate('/');
      }
    }
  }, [navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/usuarios/cambiar-password', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contrasenaActual: currentPassword,
          nuevaContrasena: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cambiar la contraseña.');
      }

      setSuccess(data.message || 'Contraseña cambiada con éxito.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.message || 'Hubo un error al cambiar la contraseña.');
    }
  };

  if (!user) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
      <p className="text-gray-800 font-medium mb-4">Usuario: {user.nombre} {user.apellido}</p>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-gray-600">Contraseña Actual</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
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
          <label htmlFor="confirmPassword" className="block text-gray-600">Confirmar Nueva Contraseña</label>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default UserProfile;