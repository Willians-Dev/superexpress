// FRONTEND/src/components/AddCategoryButton.jsx
import React, { useState } from 'react';
import CategoryList from './CategoryList';

const AddCategoryButton = () => {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategoriesVisibility = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="ml-4">
      <button
        onClick={toggleCategoriesVisibility}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {showCategories ? "Cancelar" : "Categorías"}
      </button>
      {showCategories && <CategoryList />}
    </div>
  );
};

export default AddCategoryButton;