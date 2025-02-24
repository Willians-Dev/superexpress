//FRONTEND\src\components\Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-[#2C35E0FF] py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Left side - Designed by */}
        <div className="text-sm text-gray-700">
          Diseñado por AR y WB
        </div>

        {/* Center - Name */}
        <div className="text-lg font-semibold text-gray-800">
          <h1>Gestor de Inventarios</h1>
        </div>

        {/* Right side - Contact button */}
        <div>
          <Link
            to="/contacto"
            className="bg-[#2C35E0FF] text-white px-4 py-2 rounded-md hover:bg-transparent hover:text-[#2C35E0FF] border border-[#2C35E0FF] transition"
          >
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;