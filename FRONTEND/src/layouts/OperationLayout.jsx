//FRONTEND\src\layouts\OperationLayout.jsx
import React, { useState } from 'react';
import ProductScanner from '../components/product/ProductScanner';
import ScannedProductList from '../components/product/ScannedProductList';

const OperationLayout = () => {
  const [scannedProducts, setScannedProducts] = useState([]);

  // Agregar un producto escaneado a la lista
  const handleAddProduct = (product) => {
    setScannedProducts((prevProducts) => [...prevProducts, product]);
  };

  // Finalizar venta y reiniciar la lista
  const handleFinalizeSale = () => {
    setScannedProducts([]);
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-full p-6 bg-gray-100">
      {/* Div horizontal superior izquierda */}
      <div className="col-span-6 bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-bold mb-4">Escanear Productos</h2>
        <ProductScanner onProductScanned={handleAddProduct} />
      </div>

      {/* Div horizontal superior derecha */}
      <div className="col-span-6 bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-bold mb-4">Información Adicional</h2>
        <p className="text-gray-500">Aquí puedes mostrar información relacionada o adicional.</p>
      </div>

      {/* Div vertical inferior arriba */}
      <div className="col-span-12 bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-bold mb-4">Lista de Productos Escaneados</h2>
        <ScannedProductList
          products={scannedProducts}
          onFinalizeSale={handleFinalizeSale}
        />
      </div>

      {/* Div vertical inferior abajo */}
      <div className="col-span-12 bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-bold mb-4">Resumen de Venta</h2>
        <p className="text-gray-500">Aquí puedes agregar un resumen de las ventas.</p>
      </div>
    </div>
  );
};

export default OperationLayout;