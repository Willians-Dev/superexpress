// src/layouts/ProductLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';

const ProductLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar incluido en el layout */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
        <ProductList /> {/* Componente para mostrar la tabla de productos */}
      </div>
    </div>
  );
};

export default ProductLayout;