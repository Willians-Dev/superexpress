// FRONTEND/src/components/CategoryList.jsx
import React, { useState, useEffect } from 'react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    nombre: '',
    descripcion: '',
  });
  const [editingCategory, setEditingCategory] = useState(null);

  // Función para obtener las categorías desde el backend
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categorias', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener categorías: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setCategories(data); // Actualiza el estado con las categorías
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Maneja los cambios en los campos de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  // Agrega una nueva categoría
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categorias', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar categoría: ${response.status} - ${errorText}`);
      }

      setNewCategory({ nombre: '', descripcion: '' }); // Resetea el formulario
      fetchCategories(); // Vuelve a obtener las categorías actualizadas
    } catch (error) {
      console.error("Error al agregar categoría:", error);
    }
  };

  // Guarda los cambios de una categoría editada
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categorias/${editingCategory.categoria_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCategory),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al editar categoría: ${response.status} - ${errorText}`);
      }

      setEditingCategory(null); // Salir del modo edición
      fetchCategories(); // Vuelve a obtener las categorías actualizadas
    } catch (error) {
      console.error("Error al editar categoría:", error);
    }
  };

  // Elimina una categoría
  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categorias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar categoría: ${response.status} - ${errorText}`);
      }

      fetchCategories(); // Vuelve a obtener las categorías actualizadas
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  return (
    <div className="flex gap-6 mt-6">
      {/* Sección del formulario */}
      <div className="flex-1 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-4">
          {editingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
        </h2>
        <form onSubmit={editingCategory ? handleSaveCategory : handleAddCategory} className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre de la Categoría"
            value={editingCategory ? editingCategory.nombre : newCategory.nombre}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            name="descripcion"
            placeholder="Descripción"
            value={editingCategory ? editingCategory.descripcion : newCategory.descripcion}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingCategory ? 'Guardar Cambios' : 'Agregar Categoría'}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {/* Sección de la lista */}
      <div className="flex-2 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-4">Lista de Categorías</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Categoría</th>
              <th className="px-4 py-2 border-b">Descripción</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoria_id}>
                <td className="border px-4 py-2">{category.nombre || 'Sin Nombre'}</td>
                <td className="border px-4 py-2">{category.descripcion || 'Sin Descripción'}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => setEditingCategory(category)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteCategory(category.categoria_id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;