import React, { useState, useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import Notification from "../common/Notification";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ nombre: "", descripcion: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // ✅ Obtener categorías desde el backend
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token, por favor inicia sesión.");

      const response = await fetch("http://localhost:5000/api/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener categorías");

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setNotification({ message: `❌ ${error.message}`, type: "error" });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Crear o actualizar categoría
  const handleAddOrEditCategory = async (category) => {
    try {
      if (!category.nombre.trim()) {
        throw new Error("El nombre de la categoría es obligatorio.");
      }

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token, por favor inicia sesión.");

      const method = editingCategory ? "PUT" : "POST";
      const url = editingCategory
        ? `http://localhost:5000/api/categorias/${editingCategory.categoria_id}`
        : "http://localhost:5000/api/categorias";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error("Error al guardar categoría");

      setNotification({
        message: editingCategory ? "✅ Categoría actualizada con éxito" : "✅ Categoría creada con éxito",
        type: "success",
      });

      fetchCategories(); // ✅ Recargar categorías después de agregar o editar
      setNewCategory({ nombre: "", descripcion: "" });
      setEditingCategory(null);
    } catch (error) {
      setNotification({ message: `❌ ${error.message}`, type: "error" });
    }
  };

  // ✅ Confirmar eliminación de categoría
  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    setShowModal(true);
  };

  // ✅ Eliminar una categoría con confirmación
  const handleDeleteCategory = async () => {
    if (!categoryToDelete || !categoryToDelete.categoria_id) {
      setNotification({ message: "❌ Error: ID de categoría no válido", type: "error" });
      setShowModal(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token, por favor inicia sesión.");

      console.log("🔍 Eliminando categoría con ID:", categoryToDelete.categoria_id);

      const response = await fetch(
        `http://localhost:5000/api/categorias/${categoryToDelete.categoria_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error del backend:", errorData);
        throw new Error(errorData.message || "Error al eliminar la categoría");
      }

      setNotification({ message: "✅ Categoría eliminada con éxito", type: "success" });

      // 🔄 Actualizar la lista sin hacer un nuevo fetch
      setCategories((prev) =>
        prev.filter((c) => c.categoria_id !== categoryToDelete.categoria_id)
      );
    } catch (error) {
      setNotification({ message: `❌ ${error.message}`, type: "error" });
    } finally {
      setShowModal(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestión de Categorías</h1>

      {/* ✅ Notificaciones */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <div className="flex gap-6">
        {/* ✅ Formulario para agregar o editar categorías */}
        <CategoryForm
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          editingCategory={editingCategory}
          onSubmit={handleAddOrEditCategory}
          onCancel={() => setEditingCategory(null)}
        />

        {/* ✅ Tabla de categorías */}
        <CategoryTable categories={categories} onEdit={setEditingCategory} onDelete={confirmDelete} />
      </div>

      {/* ✅ Modal de confirmación para eliminar */}
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteCategory}
        message={`¿Estás seguro de que deseas eliminar la categoría "${categoryToDelete?.nombre}"?`}
      />
    </div>
  );
};

export default CategoryList;