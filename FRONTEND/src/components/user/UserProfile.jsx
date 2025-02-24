// FRONTEND/src/components/user/UserProfile.jsx
import React, { useState, useEffect } from "react";

const UserProfile = ({ onPasswordChange }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error al analizar los datos del usuario:", error);
        setError("Hubo un problema al cargar la información del usuario.");
      }
    } else {
      setError("No se encontró información del usuario.");
    }
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-gray-500">Cargando información del usuario...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Información Personal</h2>
        <p className="text-gray-600 mt-2">
          Aquí puedes ver la información asociada a tu perfil.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold text-gray-700">Nombre</h3>
          <p className="text-gray-800">{`${user.nombre} ${user.apellido}`}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold text-gray-700">Correo</h3>
          <p className="text-gray-800">{user.correo}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold text-gray-700">Rol</h3>
          <p className="text-gray-800">
            {user.rol_id === 1 ? "Administrador" : "Usuario"}
          </p>
        </div>
      </div>
      {onPasswordChange && (
        <div className="bg-gray-50 p-4 rounded-md shadow mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Cambiar Contraseña</h3>
          <button
            onClick={onPasswordChange}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          >
            Modificar Contraseña
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;