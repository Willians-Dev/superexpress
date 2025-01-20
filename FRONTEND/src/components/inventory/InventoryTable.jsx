import React from "react";

const InventoryTable = ({ products }) => {
  return (
    <table className="w-full bg-white border rounded shadow-md">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Nombre</th>
          <th className="px-4 py-2 border">Stock Actual</th>
          <th className="px-4 py-2 border">Stock Mínimo</th>
          <th className="px-4 py-2 border">Código de Barras</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.producto_id}
            className={product.stock_actual < product.stock_minimo ? "bg-red-100" : ""}
          >
            <td className="border px-4 py-2">{product.nombre}</td>
            <td className="border px-4 py-2">{product.stock_actual}</td>
            <td className="border px-4 py-2">{product.stock_minimo}</td>
            <td className="border px-4 py-2">{product.codigo_barra}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;