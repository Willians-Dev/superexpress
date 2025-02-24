import React, { useState } from 'react';

const StockAdjustmentForm = ({ product, onStockUpdate, onClose }) => {
  const [stockActual, setStockActual] = useState(product.stock_actual);
  const [stockMinimo, setStockMinimo] = useState(product.stock_minimo);
  const [fechaCaducidad, setFechaCaducidad] = useState(product.fecha_caducidad || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 🔹 Validar que los valores sean correctos
    if (isNaN(stockActual) || isNaN(stockMinimo)) {
      setError("El stock debe ser un número válido.");
      return;
    }
  
    if (Number(stockActual) < 0 || Number(stockMinimo) < 0) {
      setError("El stock no puede ser negativo.");
      return;
    }
  
    if (!fechaCaducidad) {
      setError("Debe ingresar una fecha de vencimiento.");
      return;
    }
  
    setError("");
  
    try {
      // 🔹 Llamar a la función de actualización
      await onStockUpdate(product.producto_id, Number(stockActual), Number(stockMinimo), fechaCaducidad);
  
      onClose(); // Cerrar modal tras actualización exitosa
    } catch (err) {
      setError("❌ Error al actualizar el stock. Verifique los datos.");
      console.error("Error al actualizar stock:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Ajustar Stock para {product.nombre}</h2>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <div className="mb-3">
        <label className="block text-gray-700">Stock Actual:</label>
        <input
          type="number"
          min="0"
          value={stockActual}
          onChange={(e) => setStockActual(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Stock Mínimo:</label>
        <input
          type="number"
          min="0"
          value={stockMinimo}
          onChange={(e) => setStockMinimo(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Fecha de Vencimiento:</label>
        <input
          type="date"
          value={fechaCaducidad}
          onChange={(e) => setFechaCaducidad(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Guardar
        </button>
        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default StockAdjustmentForm;