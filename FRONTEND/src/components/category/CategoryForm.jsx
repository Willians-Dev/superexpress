//FRONTEND\src\components\category\CategoryForm.jsx
import React from 'react';

const CategoryForm = ({ newCategory, editingCategory, onChange, onSubmit, onCancel }) => (
  <div className="w-1/3 bg-white p-6 shadow-md rounded-md">
    <h2 className="text-lg font-bold mb-4">
      {editingCategory ? 'Editar Categoría' : 'Agregar Categoría'}
    </h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre de la categoría"
        value={newCategory.nombre}
        onChange={(e) => onChange({ ...newCategory, nombre: e.target.value })}
        className="w-full border rounded px-4 py-2"
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={newCategory.descripcion}
        onChange={(e) => onChange({ ...newCategory, descripcion: e.target.value })}
        className="w-full border rounded px-4 py-2"
      ></textarea>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {editingCategory ? 'Actualizar' : 'Guardar'}
      </button>
      {editingCategory && (
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ml-4"
          onClick={onCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  </div>
);

export default CategoryForm;