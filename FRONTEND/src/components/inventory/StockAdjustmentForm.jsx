// FRONTEND/src/components/inventory/StockAdjustmentForm.jsx
import React, { useState } from "react";

const StockAdjustmentForm = ({ product, onStockUpdate, onClose }) => {
  const [adjustment, setAdjustment] = useState(0);
  const [stockMin, setStockMin] = useState(product.stock_minimo);
  const [observation, setObservation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (adjustment !== 0) {
      onStockUpdate(product.producto_id, adjustment, observation || "Ajuste de inventario");
    }

    if (stockMin !== product.stock_minimo) {
      onStockUpdate(product.producto_id, 0, `Actualización de stock mínimo a ${stockMin}`);
    }

    onClose(); // Cerrar el formulario después del ajuste
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Ajustar Inventario</h2>
      <p className="text-gray-700 font-medium mb-4">Producto: {product.nombre}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Ajustar Stock Actual</label>
          <input
            type="number"
            step="0.01"
            value={adjustment}
            onChange={(e) => setAdjustment(Number(e.target.value))}
            placeholder="Cantidad a ajustar"
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Editar Stock Mínimo</label>
          <input
            type="number"
            step="0.01"
            value={stockMin}
            onChange={(e) => setStockMin(Number(e.target.value))}
            placeholder="Nuevo stock mínimo"
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Observaciones</label>
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Razón del ajuste"
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockAdjustmentForm;