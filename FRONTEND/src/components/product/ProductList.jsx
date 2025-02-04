// FRONTEND/src/components/product/ProductList.jsx
import React, { useState, useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import Notification from "../common/Notification";
import Barcode from "../Barcode";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // ✅ Obtener productos desde el backend
  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener productos: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setNotification({ message: "Error al obtener productos.", type: "error" });
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // ✅ Confirmar eliminación de un producto
  const confirmDelete = (producto) => {
    setProductToDelete(producto);
    setShowModal(true);
  };

  // ✅ Eliminar producto con notificación
  const handleDeleteProduct = async () => {
    if (!productToDelete || !productToDelete.producto_id) {
      setNotification({ message: "Error: ID del producto no válido", type: "error" });
      setShowModal(false);
      return;
    }
  
    console.log("🔍 Eliminando producto con ID:", productToDelete.producto_id); // 🛠 Verifica si el ID es correcto
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/productos/${productToDelete.producto_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el producto");
      }
  
      setProductos((prev) =>
        prev.filter((p) => p.producto_id !== productToDelete.producto_id)
      );
  
      setNotification({ message: "Producto eliminado con éxito.", type: "success" });
      setShowModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("❌ Error del backend:", error); // 🛠 Verifica el error en consola
      setNotification({ message: error.message, type: "error" });
    }
  };
 
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Lista de Productos</h2>

      {/* ✅ Notificación */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Presentación</th>
            <th className="px-4 py-2 border-b">Precio</th>
            <th className="px-4 py-2 border-b">Stock Actual</th>
            <th className="px-4 py-2 border-b">Categoría</th>
            <th className="px-4 py-2 border-b">Código de Barras</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.producto_id}>
              <td className="border px-4 py-2">{producto.nombre}</td>
              <td className="border px-4 py-2">{producto.presentacion || "Sin Presentación"}</td>
              <td className="border px-4 py-2">${producto.precio.toFixed(2)}</td>
              <td className="border px-4 py-2">{producto.stock_actual}</td>
              <td className="border px-4 py-2">{producto.categoria || "Sin Categoría"}</td>
              <td className="border px-4 py-2 text-center flex justify-center items-center">
                <Barcode code={producto.codigo_barra} />
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => confirmDelete(producto)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal de confirmación para eliminar producto */}
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteProduct}
        message={`¿Estás seguro de que deseas eliminar el producto "${productToDelete?.nombre}"?`}
      />
    </div>
  );
};

export default ProductList;