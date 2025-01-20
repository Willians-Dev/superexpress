import React, { useState } from "react";

const ProductSearch = ({ products, onSelect }) => {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(query.toLowerCase()) ||
      product.codigo_barra.includes(query)
  );

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre o código de barras"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <ul className="mt-2">
        {filteredProducts.map((product) => (
          <li
            key={product.producto_id}
            className="py-2 px-4 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(product)}
          >
            {product.nombre} - {product.codigo_barra}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;