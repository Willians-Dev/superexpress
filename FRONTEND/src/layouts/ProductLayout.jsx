// src/layouts/ProductLayout.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/product/ProductList';
import AddProductButton from '../components/product/AddProductButton';
import CategoryList from '../components/category/CategoryList';

const ProductLayout = () => {
  const [productos, setProductos] = useState([]);
  const [activeSection, setActiveSection] = useState('productos');

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
    setProductos((prevProductos) => [...prevProductos, newProduct]);
  };

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
        <div className="flex gap-6 mb-6">
          <button
            onClick={() => toggleSection('productos')}
            className={`px-4 py-2 rounded ${
              activeSection === 'productos' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => toggleSection('categorias')}
            className={`px-4 py-2 rounded ${
              activeSection === 'categorias' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Categorías
          </button>
        </div>

        <hr className="border-t-2 border-gray-300 my-6" />

        {activeSection === 'productos' && (
          <>
            <AddProductButton onProductAdded={handleProductAdded} />
            <ProductList productos={productos} />
          </>
        )}

        {activeSection === 'categorias' && <CategoryList />}
      </div>
    </div>
  );
};

export default ProductLayout;