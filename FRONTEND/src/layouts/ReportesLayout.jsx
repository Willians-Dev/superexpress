import React, { useState, useEffect } from 'react';
import InventoryReport from '../components/reports/InventoryReport';

const ReportesLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Token no encontrado. Redirigiendo al login...");
        }

        const response = await fetch('http://localhost:5000/api/productos', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          console.warn("Token inválido o expirado. Redirigiendo al login...");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return;
        }

        if (!response.ok) throw new Error('Error al obtener productos');

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar los productos:', err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reportes</h1>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reporte de Inventario</h2>
        {loading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Descarga un reporte detallado de los productos actualmente disponibles en el inventario.
            </p>
            <InventoryReport products={products} />
          </>
        )}
      </div>
    </div>
  );
};

export default ReportesLayout;