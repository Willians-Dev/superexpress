import React, { useState } from 'react';

const StockAdjustmentForm = ({ product, onStockUpdate, onClose }) => {
  const [stockActual, setStockActual] = useState(product.stock_actual);
  const [stockMinimo, setStockMinimo] = useState(product.stock_minimo);
  const [fechaCaducidad, setFechaCaducidad] = useState(product.fecha_caducidad || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (stockActual < 0 || stockMinimo < 0) {
      setError("El stock no puede ser negativo.");
      return;
    }

    if (!fechaCaducidad) {
      setError("Debe ingresar una fecha de vencimiento.");
      return;
    }

    setError("");

    onStockUpdate(product.producto_id, {
      stock_actual: parseInt(stockActual),
      stock_minimo: parseInt(stockMinimo),
      fecha_caducidad: fechaCaducidad
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Ajustar Stock para {product.nombre}</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <div>
        <label>Stock Actual:</label>
        <input
          type="number"
          value={stockActual}
          onChange={(e) => setStockActual(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>Stock Mínimo:</label>
        <input
          type="number"
          value={stockMinimo}
          onChange={(e) => setStockMinimo(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>Fecha de Vencimiento:</label>
        <input
          type="date"
          value={fechaCaducidad}
          onChange={(e) => setFechaCaducidad(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
        Guardar
      </button>
      <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">
        Cancelar
      </button>
    </form>
  );
};

export default StockAdjustmentForm;