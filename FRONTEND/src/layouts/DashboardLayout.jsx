// FRONTEND/src/layouts/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fijo en la parte superior */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar ajustable */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;