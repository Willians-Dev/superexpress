import React from 'react';
import Sidebar from '../components/Sidebar'; // Asegúrate de la ruta correcta
import Header from '../components/Header';   // Asegúrate de la ruta correcta

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Se puede colocar el Header en la parte superior */}
     
      <div className="flex h-screen">
        {/* Sidebar en el lado izquierdo */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex-grow p-4 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;