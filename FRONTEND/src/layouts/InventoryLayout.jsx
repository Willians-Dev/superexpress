import React, { useState, useEffect } from "react";
import ProductSearch from "../components/inventory/ProductSearch";
import StockAdjustmentForm from "../components/inventory/StockAdjustmentForm";
import InventoryTable from "../components/inventory/InventoryTable";
import Spinner from "../components/common/Spinner";
import Notification from "../components/common/Notification";

const InventoryLayout = () => {
  const [products, setProducts] = useState([]); // Lista completa de productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados para la búsqueda
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // ✅ Obtener productos desde el backend
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener productos.");

      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Inicializar con la lista completa
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        message: "No se pudieron cargar los productos.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Actualizar stock en la base de datos y UI
  const handleStockUpdate = async (productId, newStockActual, newStockMin) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/productos/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock_actual: newStockActual, stock_minimo: newStockMin }),
      });

      if (!response.ok) throw new Error("Error al actualizar el stock");

      // ✅ Actualizar los productos en el estado
      setProducts((prev) =>
        prev.map((p) =>
          p.producto_id === productId
            ? { ...p, stock_actual: newStockActual, stock_minimo: newStockMin }
            : p
        )
      );

      // ✅ También actualizar la lista filtrada
      setFilteredProducts((prev) =>
        prev.map((p) =>
          p.producto_id === productId
            ? { ...p, stock_actual: newStockActual, stock_minimo: newStockMin }
            : p
        )
      );

      setNotification({
        message: "Stock actualizado correctamente.",
        type: "success",
      });

      setSelectedProduct(null); // Cerrar formulario de ajuste
    } catch (error) {
      console.error(error);
      setNotification({
        message: "Error al actualizar stock.",
        type: "error",
      });
    }
  };

  // ✅ Función para buscar productos
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    if (query.trim() === "") {
      setFilteredProducts(products); // 🔄 Restaurar lista si la búsqueda está vacía
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.nombre.toLowerCase().includes(lowerCaseQuery) ||
            product.categoria.toLowerCase().includes(lowerCaseQuery) ||
            product.codigo_barra.includes(lowerCaseQuery)
        )
      );
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Gestión de Inventarios</h1>

      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <ProductSearch onSearch={handleSearch} />

      {selectedProduct && (
        <StockAdjustmentForm
          product={selectedProduct}
          onStockUpdate={handleStockUpdate}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <InventoryTable products={filteredProducts} onSelectProduct={setSelectedProduct} />
    </div>
  );
};

export default InventoryLayout;