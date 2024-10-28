import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Panel de Control</h2>

      {/* Enlaces del Sidebar */}
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/usuarios" className="hover:bg-blue-700 p-2 rounded">
          Gestión de Usuarios
        </Link>
        <Link to="/profile" className="hover:bg-blue-700 p-2 rounded">
          Perfil
        </Link>
        <Link to="/settings" className="hover:bg-blue-700 p-2 rounded">
          Configuración
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;