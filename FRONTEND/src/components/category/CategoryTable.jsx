//FRONTEND\src\components\category\CategoryTable.jsx
import React from "react";

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  // Filtrar categorías inválidas
  const validCategories = categories.filter(category => category && category.categoria_id);

  return (
    <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4">Lista de Categorías</h2>
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr className="text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Categoría</th>
            <th className="py-3 px-6 text-left">Descripción</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {validCategories.length > 0 ? (
            validCategories.map((category) => (
              <tr key={category.categoria_id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {category.nombre || "Sin Nombre"}
                </td>
                <td className="py-3 px-6 text-left">
                  {category.descripcion || "Sin Descripción"}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(category)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-4 text-center text-gray-500">
                No hay categorías disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;