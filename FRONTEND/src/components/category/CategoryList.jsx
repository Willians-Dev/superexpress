//FRONTEND\src\components\category\CategoryList.jsx
import React, { useState, useEffect } from 'react';
import ConfirmationModal from "../common/ConfirmationModal";
import CategoryForm from './CategoryForm';
import CategoryTable from './CategoryTable';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ nombre: '', descripcion: '' });
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categorias', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al obtener categorías');

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categorias/${categoryToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al eliminar categoría');

      setCategories((prev) => prev.filter((c) => c.categoria_id !== categoryToDelete));
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleAddOrEditCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const method = editingCategory ? 'PUT' : 'POST';
      const url = editingCategory
        ? `http://localhost:5000/api/categorias/${editingCategory.categoria_id}`
        : 'http://localhost:5000/api/categorias';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) throw new Error('Error al guardar categoría');

      if (editingCategory) {
        setCategories((prev) =>
          prev.map((c) =>
            c.categoria_id === editingCategory.categoria_id
              ? { ...c, ...newCategory }
              : c
          )
        );
      } else {
        const addedCategory = await response.json();
        setCategories((prev) => [...prev, addedCategory]);
      }

      setNewCategory({ nombre: '', descripcion: '' });
      setEditingCategory(null);
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    }
  };

  const handleEdit = (category) => {
    setNewCategory({ nombre: category.nombre, descripcion: category.descripcion });
    setEditingCategory(category);
  };

  const confirmDelete = (id) => {
    setCategoryToDelete(id);
    setShowModal(true);
  };

  return (
    <div className="flex gap-6">
      <CategoryForm
        newCategory={newCategory}
        editingCategory={editingCategory}
        onChange={setNewCategory}
        onSubmit={handleAddOrEditCategory}
        onCancel={() => {
          setNewCategory({ nombre: '', descripcion: '' });
          setEditingCategory(null);
        }}
      />
      <CategoryTable categories={categories} onEdit={handleEdit} onDelete={confirmDelete} />
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteCategory}
        message="¿Estás seguro de que deseas eliminar esta categoría?"
      />
    </div>
  );
};

export default CategoryList;