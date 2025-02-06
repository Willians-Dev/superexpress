import React, { useState } from 'react';
import ProductList from '../components/product/ProductList';
import AddProductButton from '../components/product/AddProductButton';
import ProductAdd from '../components/product/ProductAdd'; // Importar el componente ProductAdd
import CategoryList from '../components/category/CategoryList';
import PresentacionList from '../components/presentation/PresentacionList';

const ProductLayout = () => {
  const [activeSection, setActiveSection] = useState('productos');
  const [showAddProduct, setShowAddProduct] = useState(false); // Estado para controlar la visibilidad de ProductAdd
  const [refresh, setRefresh] = useState(false); // Estado para refrescar ProductList después de agregar un producto

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
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
          <button
            onClick={() => toggleSection('presentaciones')}
            className={`px-4 py-2 rounded ${
              activeSection === 'presentaciones' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Presentaciones
          </button>
        </div>

        <hr className="border-t-2 border-gray-300 my-6" />

        {/* Secciones dinámicas */}
        {activeSection === 'productos' && (
          <>
            <AddProductButton onClick={() => setShowAddProduct(true)} />
            {showAddProduct && (
              <ProductAdd
                onProductAdded={() => {
                  setShowAddProduct(false); // Cerrar el formulario después de agregar un producto
                  setRefresh((prev) => !prev); // Refrescar la lista de productos
                }}
                onClose={() => setShowAddProduct(false)} // Cerrar el formulario si el usuario cancela
              />
            )}
            <ProductList refresh={refresh} />
          </>
        )}
        {activeSection === 'categorias' && <CategoryList />}
        {activeSection === 'presentaciones' && <PresentacionList />}
      </div>
    </div>
  );
};

export default ProductLayout;