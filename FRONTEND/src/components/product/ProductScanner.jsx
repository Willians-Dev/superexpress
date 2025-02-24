//FRONTEND\src\components\product\ProductScanner.jsx
import React, { useState, useEffect, useRef } from 'react';

const ProductScanner = ({ onProductScanned }) => {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Enfocar automáticamente el campo de entrada al cargar el componente
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

      onProductScanned(product); // Notifica al componente padre
      setBarcode(''); // Limpia el input después de escanear
      setError('');
    } catch (err) {
      setError(err.message);
      setBarcode(''); // Limpia el input en caso de error
    }
  };

  // Procesar automáticamente cuando el código de barras se ingresa por completo
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleScan(); // Llama a la función para procesar el escaneo
    }
  };

  return (
    <div>
      <input
        type="text"
        value={barcode}
        ref={inputRef} // Referencia para autoenfocar
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={handleKeyPress} // Escucha "Enter" para procesar
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