import React, { useState, useEffect } from 'react';
import ProductList from '../components/product/ProductList';
import AddProductButton from '../components/product/AddProductButton';
import CategoryList from '../components/category/CategoryList';
import PresentacionList from '../components/presentation/PresentacionList';

const ProductLayout = () => {
  const [activeSection, setActiveSection] = useState('productos');
  const [productos, setProductos] = useState([]);

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  // ✅ Obtener productos
  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }

      const data = await response.json();
      setProductos(data);
      return data; // 🔹 Se devuelve para que `ProductList` lo use en `useEffect`
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
        <div className="flex gap-6 mb-6">
          <button onClick={() => toggleSection('productos')} className={`px-4 py-2 rounded ${activeSection === 'productos' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Productos
          </button>
          <button onClick={() => toggleSection('categorias')} className={`px-4 py-2 rounded ${activeSection === 'categorias' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Categorías
          </button>
          <button onClick={() => toggleSection('presentaciones')} className={`px-4 py-2 rounded ${activeSection === 'presentaciones' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Presentaciones
          </button>
        </div>

        {activeSection === 'productos' && (
          <>
            <AddProductButton onProductAdded={fetchProductos} />
            <ProductList fetchProductos={fetchProductos} />
          </>
        )}
        {activeSection === 'categorias' && <CategoryList />}
        {activeSection === 'presentaciones' && <PresentacionList />}
      </div>
    </div>
  );
};

export default ProductLayout;