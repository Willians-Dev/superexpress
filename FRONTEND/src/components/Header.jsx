import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b-4 border-[#2C35E0FF] min-h-[80px]">
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img src="/logo.jpg" alt="Logo" className="h-auto max-h-12 w-auto" /> {/* Nueva ruta de la imagen */}
        </div>

        {/* Title in the center */}
        <div className="text-lg font-semibold text-gray-800 flex-1 text-center">
          <h1>SuperExpress</h1>
        </div>

        {/* Link to 'Sobre Nosotros' on the right */}
        <div>
          <Link
            to="/sobre-nosotros"
            className="bg-[#2C35E0FF] text-white px-4 py-2 rounded-md hover:bg-transparent hover:text-[#2C35E0FF] border border-[#2C35E0FF] transition"
          >
            Sobre Nosotros
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;