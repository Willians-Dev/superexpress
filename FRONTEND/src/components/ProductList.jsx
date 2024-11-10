// FRONTEND/src/components/Products/ProductList.js
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de que el token esté almacenado en localStorage
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;