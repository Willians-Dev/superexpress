// FRONTEND/src/pages/Productos.jsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ProductLayout from '../layouts/ProductLayout';

const Productos = () => {
  return (
    <DashboardLayout> {/* Envuelve ProductLayout dentro de DashboardLayout */}
      <ProductLayout />
    </DashboardLayout>
  );
};

export default Productos;