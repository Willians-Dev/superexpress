import React, { useState, useEffect } from 'react';

const ProductAdd = ({ onProductAdded }) => {
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    presentacion: '',
    descripcion: '',
    codigo_barra: '',
    precio: '',
    stock_actual: '',
    stock_minimo: '',
    fecha_caducidad: '',
    categoria_id: '',
  });

  const [categorias, setCategorias] = useState([]);

  // Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/categorias', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }

        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleGenerateBarcode = () => {
    const generatedCode = Math.floor(100000000000 + Math.random() * 900000000000);
    setNewProduct({ ...newProduct, codigo_barra: generatedCode.toString() });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar producto: ${response.status} - ${errorText}`);
      }

      const addedProduct = await response.json();
      onProductAdded(addedProduct);

      // Resetear el formulario después de agregar el producto
      setNewProduct({
        nombre: '',
        presentacion: '',
        descripcion: '',
        codigo_barra: '',
        precio: '',
        stock_actual: '',
        stock_minimo: '',
        fecha_caducidad: '',
        categoria_id: '',
      });
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="space-y-4 mt-4">
      <input
        name="nombre"
        placeholder="Nombre"
        value={newProduct.nombre}
        onChange={handleInputChange}
        required
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
        name="presentacion"
        placeholder="Presentación"
        value={newProduct.presentacion}
        onChange={handleInputChange}
        required
        className="border border-gray-300 p-2 rounded w-full"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={newProduct.descripcion}
        onChange={handleInputChange}
        className="border border-gray-300 p-2 rounded w-full"
      />
      <div className="flex items-center">
        <input
          name="codigo_barra"
          placeholder="Código de Barra"
          value={newProduct.codigo_barra}
          onChange={handleInputChange}
          required
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          type="button"
          onClick={handleGenerateBarcode}
          className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
        >
          +
        </button>
      </div>
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={newProduct.precio}
        onChange={handleInputChange}
        required
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
        type="number"
        name="stock_actual"
        placeholder="Stock Actual"
        value={newProduct.stock_actual}
        onChange={handleInputChange}
        required
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
        type="number"
        name="stock_minimo"
        placeholder="Stock Mínimo"
        value={newProduct.stock_minimo}
        onChange={handleInputChange}
        required
        className="border border-gray-300 p-2 rounded w-full"
      />
      <input
        type="date"
        name="fecha_caducidad"
        placeholder="Fecha de Caducidad"
        value={newProduct.fecha_caducidad}
        onChange={handleInputChange}
        className="border border-gray-300 p-2 rounded w-full"
      />
      <select
        name="categoria_id"
        value={newProduct.categoria_id}
        onChange={handleInputChange}
        required
        className="border border-gray-300 p-2 rounded w-full"
      >
        <option value="">Seleccionar Categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.categoria_id} value={categoria.categoria_id}>
            {categoria.nombre}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default ProductAdd;