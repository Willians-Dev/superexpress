//FRONTEND\src\pages\Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Acceso No Autorizado</h1>
      <p className="text-gray-700 mb-6">No tienes permiso para acceder a esta página.</p>
      <Link
        to="/inicio"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default Unauthorized;