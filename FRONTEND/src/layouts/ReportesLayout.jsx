// FRONTEND/src/layouts/ReportesLayout.jsx
import React, { useState, useEffect } from 'react';
import InventoryReport from '../components/reports/InventoryReport';

const ReportesLayout = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Error al obtener productos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reportes</h1>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reporte de Inventario</h2>
        <p className="text-gray-600 mb-4">
          Descarga un reporte detallado de los productos actualmente disponibles en el inventario.
        </p>
        <InventoryReport products={products} />
      </div>
    </div>
  );
};

export default ReportesLayout;