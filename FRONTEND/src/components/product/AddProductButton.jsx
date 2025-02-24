import React, { useState } from 'react';
import ProductAdd from './ProductAdd';

const AddProductButton = ({ onProductAdded }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="mb-6">
      <button
        onClick={toggleFormVisibility}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showForm ? "Cancelar" : "Agregar Producto"}
      </button>
      {showForm && <ProductAdd onProductAdded={onProductAdded} />}
    </div>
  );
};

export default AddProductButton;