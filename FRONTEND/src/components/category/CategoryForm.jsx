//FRONTEND\src\components\category\CategoryForm.jsx
import React, { useState, useEffect } from "react";

const CategoryForm = ({ newCategory, setNewCategory, editingCategory, onSubmit, onCancel }) => {
  const [category, setCategory] = useState({ nombre: "", descripcion: "" });

  // ✅ Cargar datos en modo edición
  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory);
    } else {
      setCategory({ nombre: "", descripcion: "" });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value })); // ✅ Actualiza estado local

    if (setNewCategory && typeof setNewCategory === "function") {
      setNewCategory((prev) => ({ ...prev, [name]: value })); // ✅ También actualiza el estado global
    } else {
      console.warn("⚠️ setNewCategory no es una función");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(category); // ✅ Envía los datos
    setCategory({ nombre: "", descripcion: "" }); // ✅ Resetea el formulario
  };

  return (
    <div className="w-1/3 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4">
        {editingCategory ? "Editar Categoría" : "Agregar Categoría"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la categoría"
          value={category.nombre}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={category.descripcion}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        ></textarea>
        <div className="flex space-x-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            {editingCategory ? "Actualizar" : "Guardar"}
          </button>
          {editingCategory && (
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;