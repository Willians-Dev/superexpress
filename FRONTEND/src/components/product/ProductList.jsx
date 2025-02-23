import React, { useState, useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import Notification from "../common/Notification";
import Barcode from "../Barcode";

const ProductList = ({ fetchProductos }) => {
  const [productos, setProductos] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  // ✅ Obtener productos desde el backend
  useEffect(() => {
    fetchProductos().then(setProductos);
  }, [fetchProductos]); // Se ejecuta cuando fetchProductos cambia

  // ✅ Filtrar productos según la búsqueda
  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Confirmar eliminación de un producto
  const confirmDelete = (producto) => {
    setProductToDelete(producto);
    setShowModal(true);
  };

  // ✅ Eliminar producto y actualizar la lista
  const handleDeleteProduct = async () => {
    if (!productToDelete || !productToDelete.producto_id) {
      setNotification({ message: "Error: ID del producto no válido", type: "error" });
      setShowModal(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/productos/${productToDelete.producto_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      setNotification({ message: "Producto eliminado con éxito.", type: "success" });
      setShowModal(false);
      setProductToDelete(null);

      // ✅ Recargar lista de productos
      fetchProductos().then(setProductos);
      
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Lista de Productos</h2>

      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      {/* 🔍 Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o categoría"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* 🛒 Tabla de productos */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
            <th className="px-4 py-2 border-b">Categoría</th>
            <th className="px-4 py-2 border-b">Presentación</th>
            <th className="px-4 py-2 border-b">Precio</th>
            <th className="px-4 py-2 border-b">Stock Actual</th>
            <th className="px-4 py-2 border-b">Código de Barras</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((producto) => (
            <tr key={producto.producto_id}>
              <td className="border px-4 py-2">{producto.nombre}</td>
              <td className="border px-4 py-2">{producto.categoria || "Sin Categoría"}</td>
              <td className="border px-4 py-2">{producto.presentacion || "Sin Presentación"}</td>
              <td className="border px-4 py-2">${producto.precio.toFixed(2)}</td>
              <td className="border px-4 py-2">{producto.stock_actual}</td>
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

      {/* 🗑 Modal de confirmación de eliminación */}
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