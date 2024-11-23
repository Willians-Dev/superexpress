// FRONTEND/src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import Barcode from '../Barcode';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [showNumber, setShowNumber] = useState({});

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/productos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error en la respuesta de la API: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleToggle = (id) => {
    setShowNumber((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setShowNumber((prev) => ({ ...prev, [id]: false }));
    }, 5000);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Presentación</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Stock Actual</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Código de Barras</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.producto_id}>
              <td className="border px-4 py-2">{producto.nombre}</td>
              <td className="border px-4 py-2">{producto.presentacion}</td>
              <td className="border px-4 py-2">${producto.precio}</td>
              <td className="border px-4 py-2">{producto.stock_actual}</td>
              <td className="border px-4 py-2">{producto.categoria || producto.categorias.nombre || 'Sin Categoría'}</td>
              <td className="border px-4 py-2 text-center" onClick={() => handleToggle(producto.producto_id)}>
                <div className="flex justify-center items-center">
                  {showNumber[producto.producto_id] ? (
                    <p>{producto.codigo_barra}</p>
                  ) : (
                    <Barcode code={producto.codigo_barra} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;