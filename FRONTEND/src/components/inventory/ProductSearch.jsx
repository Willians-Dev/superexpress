import React, { useState } from "react";

const ProductSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // 🔍 Ejecutar la búsqueda
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value === "") {
      onSearch(""); // 🔄 Restaurar la lista de productos al borrar
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex space-x-2">
      <input
        type="text"
        placeholder="Buscar por nombre, categoría o código de barras"
        value={searchQuery}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buscar
      </button>
    </form>
  );
};

export default ProductSearch;