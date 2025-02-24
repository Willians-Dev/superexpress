import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenedor principal ajustado */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header fijo en la parte superior */}
        <Header />

        {/* Contenido principal con desplazamiento */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6 mt-[80px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;