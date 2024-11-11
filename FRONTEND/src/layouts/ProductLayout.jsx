// FRONTEND/src/layouts/ProductLayout.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import AddProductButton from '../components/AddProductButton';

const ProductLayout = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/productos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error en la respuesta de la API: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProductos([...productos, newProduct]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
        
        <div className="mb-4"> {/* Contenedor para el botón y el formulario */}
          <AddProductButton onProductAdded={handleProductAdded} />
        </div>

        <ProductList productos={productos} />
      </div>
    </div>
  );
};

export default ProductLayout;