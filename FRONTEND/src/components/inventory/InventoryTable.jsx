import React from 'react';
import Barcode from '../Barcode';

const InventoryTable = ({ products, onSelectProduct, stockCriticalProducts, expiringProducts }) => {
  return (
    <div>
      {/* 📋 Leyenda de colores */}
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <h3 className="font-semibold">📌 Leyenda de Colores:</h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-4 h-4 bg-red-100 border"></div> <span>Stock Crítico</span>
          <div className="w-4 h-4 bg-yellow-100 border"></div> <span>Próximo a Vencer</span>
          <div className="w-4 h-4 bg-orange-200 border"></div> <span>Ambas Alertas</span>
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Categoría</th>
            <th className="px-4 py-2 border-b">Presentación</th>
            <th className="px-4 py-2 border-b">Código de Barra</th>
            <th className="px-4 py-2 border-b">Stock Actual</th>
            <th className="px-4 py-2 border-b">Stock Mínimo</th>
            <th className="px-4 py-2 border-b">Fecha de Vencimiento</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isStockCritical = stockCriticalProducts.some(p => p.producto_id === product.producto_id);
            const isExpiringSoon = expiringProducts.some(p => p.producto_id === product.producto_id);

            let rowClass = "";
            if (isStockCritical && isExpiringSoon) rowClass = "bg-orange-200"; // 🟠 Ambas alertas
            else if (isStockCritical) rowClass = "bg-red-100"; // 🔴 Stock crítico
            else if (isExpiringSoon) rowClass = "bg-yellow-100"; // 🟡 Por vencer

            return (
              <tr key={product.producto_id} className={`border ${rowClass}`}>
                <td className="border px-4 py-2">{product.nombre}</td>
                <td className="border px-4 py-2">{product.categoria || "Sin Categoría"}</td>
                <td className="border px-4 py-2">{product.presentacion || "Sin Presentación"}</td>
                <td className="border px-4 py-2 text-center">
                  {product.codigo_barra ? <Barcode code={product.codigo_barra} /> : "No disponible"}
                </td>
                <td className="border px-4 py-2">{product.stock_actual}</td>
                <td className="border px-4 py-2">{product.stock_minimo}</td>
                <td className="border px-4 py-2">{product.fecha_caducidad || "N/A"}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;