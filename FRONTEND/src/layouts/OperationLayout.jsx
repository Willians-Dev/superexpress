import React, { useState } from "react";
import ProductScanner from "../components/product/ProductScanner";
import ScannedProductList from "../components/product/ScannedProductList";

const OperationLayout = () => {
  const [scannedProducts, setScannedProducts] = useState([]);
  const [error, setError] = useState("");

  // ✅ Agregar producto escaneado o actualizar cantidad
  const handleAddProduct = (product) => {
    const existingProduct = scannedProducts.find(
      (p) => p.producto_id === product.producto_id
    );

    if (existingProduct) {
      setScannedProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.producto_id === product.producto_id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      );
    } else {
      setScannedProducts([...scannedProducts, { ...product, cantidad: 1 }]);
    }

    setError("");
  };

  // ✅ Modificar la cantidad manualmente en la tabla
  const handleUpdateQuantity = (productId, newQuantity) => {
    setScannedProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.producto_id === productId ? { ...p, cantidad: newQuantity } : p
      )
    );
  };

  // ✅ Finalizar venta y reiniciar la lista
  const handleFinalizeSale = () => {
    setScannedProducts([]);
    alert("Venta finalizada con éxito.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Operaciones</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Escanear productos */}
        <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Escanear Productos</h2>
          <ProductScanner
            onProductScanned={handleAddProduct}
            setError={setError}
          />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Información adicional */}
        <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Información Adicional</h2>
          <p className="text-gray-500">
            Aquí puedes mostrar estadísticas rápidas o instrucciones para el usuario.
          </p>
        </div>

        {/* Lista de productos escaneados */}
        <div className="lg:col-span-8 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Productos Escaneados</h2>
          <ScannedProductList
            products={scannedProducts}
            onFinalizeSale={handleFinalizeSale}
            onUpdateQuantity={handleUpdateQuantity} // ✅ Nueva función
          />
        </div>

        {/* Resumen de la venta */}
        <div className="lg:col-span-4 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Resumen de la Venta</h2>
          <p className="text-gray-800 text-lg">
            Total productos:{" "}
            <span className="font-bold">
              {scannedProducts.reduce((total, product) => total + product.cantidad, 0)}
            </span>
          </p>
          <p className="text-gray-800 text-lg">
            Total a pagar:{" "}
            <span className="font-bold">
              $
              {scannedProducts
                .reduce((total, product) => total + product.cantidad * product.precio, 0)
                .toFixed(2)}
            </span>
          </p>
          <button
            onClick={handleFinalizeSale}
            className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Finalizar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationLayout;