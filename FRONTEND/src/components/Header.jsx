import React from 'react';
import { Link } from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';

const Header = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
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

        {/* Parte derecha: UserInfo */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
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