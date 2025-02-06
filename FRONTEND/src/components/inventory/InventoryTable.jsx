import React from 'react';
import Barcode from '../Barcode';

const InventoryTable = ({ products, onSelectProduct }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Nombre</th>
          <th className="px-4 py-2 border-b">Categoría</th>
          <th className="px-4 py-2 border-b">Presentación</th>
          <th className="px-4 py-2 border-b">Código de Barra</th>
          <th className="px-4 py-2 border-b">Stock Actual</th>
          <th className="px-4 py-2 border-b">Stock Mínimo</th>
          <th className="px-4 py-2 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.producto_id}>
            <td className="border px-4 py-2">{product.nombre}</td>
            <td className="border px-4 py-2">{product.categoria || "Sin Categoría"}</td>
            <td className="border px-4 py-2">{product.presentacion || "Sin Presentación"}</td>
            <td className="border px-4 py-2 text-center">
              {product.codigo_barra ? <Barcode code={product.codigo_barra} /> : "No disponible"}
            </td>
            <td className="border px-4 py-2">{product.stock_actual}</td>
            <td className="border px-4 py-2">{product.stock_minimo}</td>
            <td className="border px-4 py-2 text-center">
              <button
                onClick={() => onSelectProduct(product)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Seleccionar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;