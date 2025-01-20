// FRONTEND/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';

const Header = () => {
  let user = null;

  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser); // Intenta parsear solo si hay un valor
    }
  } catch (error) {
    console.error('Error al parsear el usuario de localStorage:', error);
    user = null; // En caso de error, user se mantiene como null
  }

  return (
    <header className="bg-white border-b-4 border-[#2C35E0FF] min-h-[80px]">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo y título */}
        <div className="flex items-center space-x-4">
          <img src="/logo.jpg" alt="Logo" className="h-auto max-h-12 w-auto" />
          <h1 className="text-lg font-semibold text-gray-800">SuperExpress</h1>
        </div>

        {/* Parte derecha: Manual de Usuario y UserInfo */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              {/* Botón de Manual de Usuario */}
              <Link
                to="/sobre-nosotros"
                className="bg-[#2C35E0FF] text-white px-4 py-2 rounded-md hover:bg-transparent hover:text-[#2C35E0FF] border border-[#2C35E0FF] transition"
              >
                Manual de Usuario
              </Link>

              {/* Información del usuario en el Header */}
              <HeaderUserInfo />
            </>
          ) : (
            <Link
              to="/login"
              className="text-[#2C35E0FF] hover:underline"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;