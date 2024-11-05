// src/pages/Productos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    presentacion: '',
    descripcion: '',
    codigo_barra: '',
    precio: 0,
    stock_actual: 0,
    stock_minimo: 0,
    fecha_caducidad: '',
    categoria_id: ''
  });

  useEffect(() => {
    // Obtener categorías desde el backend
    const fetchCategorias = async () => {
      const response = await axios.get('/api/categorias');
      setCategorias(response.data);
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/productos', producto);
      alert('Producto agregado exitosamente');
      // Limpiar el formulario después de enviar
      setProducto({
        nombre: '',
        presentacion: '',
        descripcion: '',
        codigo_barra: '',
        precio: 0,
        stock_actual: 0,
        stock_minimo: 0,
        fecha_caducidad: '',
        categoria_id: ''
      });
    } catch (error) {
      alert('Error al agregar producto');
    }
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} value={producto.nombre} />
        <input name="presentacion" placeholder="Presentación" onChange={handleChange} value={producto.presentacion} />
        <input name="descripcion" placeholder="Descripción" onChange={handleChange} value={producto.descripcion} />
        <input name="codigo_barra" placeholder="Código de Barras" onChange={handleChange} value={producto.codigo_barra} />
        <input name="precio" type="number" placeholder="Precio" onChange={handleChange} value={producto.precio} />
        <input name="stock_actual" type="number" placeholder="Stock Actual" onChange={handleChange} value={producto.stock_actual} />
        <input name="stock_minimo" type="number" placeholder="Stock Mínimo" onChange={handleChange} value={producto.stock_minimo} />
        <input name="fecha_caducidad" type="date" onChange={handleChange} value={producto.fecha_caducidad} />
        <select name="categoria_id" onChange={handleChange} value={producto.categoria_id}>
          <option value="">Seleccione Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.categoria_id} value={categoria.categoria_id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default Productos;