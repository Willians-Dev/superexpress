//FRONTEND\src\components\product\ProductScanner.jsx
import React, { useState } from 'react';

const ProductScanner = ({ onProductScanned }) => {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');

  const handleScan = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/productos/barcode/${barcode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Producto no encontrado o error al escanear.');
      }

      const product = await response.json();

      // Registrar salida en el backend
      const salidaResponse = await fetch(`http://localhost:5000/api/salidas`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          producto_id: product.producto_id,
          cantidad: 1, // Cantidad fija para restar por escaneo
          usuario_id: JSON.parse(localStorage.getItem('user')).usuario_id,
          observaciones: 'Venta directa escaneada',
        }),
      });

      if (!salidaResponse.ok) {
        throw new Error('Error al registrar la salida del producto.');
      }

      onProductScanned(product);
      setBarcode('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Escanea el código de barras"
        className="border rounded px-4 py-2 w-full"
      />
      <button
        onClick={handleScan}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Escanear
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ProductScanner;