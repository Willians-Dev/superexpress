import React from 'react';

const CategoryTable = ({ categories, onEdit, onDelete }) => (
  <div className="flex-1 bg-white p-6 shadow-md rounded-md">
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
                onClick={() => onEdit(category)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(category.categoria_id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CategoryTable;