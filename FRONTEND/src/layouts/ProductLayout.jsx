// FRONTEND/src/layouts/ProductLayout.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/product/ProductList';
import AddProductButton from '../components/product/AddProductButton';
import AddCategoryButton from '../components/category/AddCategoryButton';

const ProductLayout = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener productos: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProductos([...productos, newProduct]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar incluido en el layout */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
        <div className="flex gap-6 mb-6">
          {/* Botones de agregar producto y categorías */}
          <AddProductButton onProductAdded={handleProductAdded} />
          <AddCategoryButton />
        </div>

        {/* Línea separadora */}
        <hr className="border-t-2 border-gray-300 my-6" />

        {/* Lista de productos */}
        <ProductList productos={productos} />
      </div>
    </div>
  );
};

export default ProductLayout;