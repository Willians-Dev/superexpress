// FRONTEND/src/components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import Barcode from '../Barcode';

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/productos', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener productos: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Presentación</th>
            <th className="px-4 py-2 border-b">Precio</th>
            <th className="px-4 py-2 border-b">Stock Actual</th>
            <th className="px-4 py-2 border-b">Categoría</th>
            <th className="px-4 py-2 border-b">Código de Barras</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.producto_id}>
              <td className="border px-4 py-2">{producto.nombre}</td>
              <td className="border px-4 py-2">{producto.presentacion || 'Sin Presentación'}</td>
              <td className="border px-4 py-2">${producto.precio.toFixed(2)}</td>
              <td className="border px-4 py-2">{producto.stock_actual}</td>
              <td className="border px-4 py-2">{producto.categoria || 'Sin Categoría'}</td>
              <td className="border px-4 py-2 text-center flex justify-center items-center">
                <Barcode code={producto.codigo_barra} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;