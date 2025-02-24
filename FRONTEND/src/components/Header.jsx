import React from "react";
import { Link } from "react-router-dom";
import HeaderUserInfo from "./HeaderUserInfo";

const Header = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Error al parsear el usuario de localStorage:", error);
    user = null;
  }

  return (
    <header className="fixed top-0 left-64 right-0 w-[calc(100%-16rem)] bg-white border-b-4 border-[#2C35E0FF] h-[80px] z-10 shadow-md flex items-center px-8">
      {/* Logo y título */}
      <div className="flex items-center space-x-4">
        <img src="/logo.jpg" alt="Logo" className="h-auto max-h-12 w-auto" />
        <h1 className="text-lg font-semibold text-gray-800">SuperExpress</h1>
      </div>

      {/* Espaciador flexible */}
      <div className="flex-1"></div>

      {/* Parte derecha: UserInfo */}
      <div className="flex items-center space-x-6">
        {user ? (
          <HeaderUserInfo />
        ) : (
          <Link to="/login" className="text-[#2C35E0FF] hover:underline">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;