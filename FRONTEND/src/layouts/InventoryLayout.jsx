import React, { useState, useEffect } from "react";
import ProductSearch from "../components/inventory/ProductSearch";
import StockAdjustmentForm from "../components/inventory/StockAdjustmentForm";
import InventoryTable from "../components/inventory/InventoryTable";
import Spinner from "../components/common/Spinner";
import Notification from "../components/common/Notification";

const InventoryLayout = () => {
  const [products, setProducts] = useState([]); // Lista completa de productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [stockCriticalProducts, setStockCriticalProducts] = useState([]);
  const [expiringProducts, setExpiringProducts] = useState([]);

  // 🔹 Guardar alertas en `localStorage`
  const updateNotifications = (criticalProducts, expiringProducts) => {
    const alerts = [];

    if (criticalProducts.length > 0) {
      alerts.push(`⚠️ ${criticalProducts.length} productos en stock crítico`);
      criticalProducts.forEach((product) => {
        alerts.push(`⚠️ El producto "${product.nombre}" está en stock crítico (${product.stock_actual} disponibles).`);
      });
    }

    if (expiringProducts.length > 0) {
      alerts.push(`⏳ ${expiringProducts.length} productos próximos a vencer`);
      expiringProducts.forEach((product) => {
        alerts.push(`⏳ El producto "${product.nombre}" vence pronto (${product.fecha_caducidad}).`);
      });
    }

    localStorage.setItem("inventoryAlerts", JSON.stringify(alerts));
  };

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
      setFilteredProducts(data);

      // 🔍 Filtrar productos en stock crítico
      const criticalProducts = data.filter((p) => p.stock_actual <= p.stock_minimo);
      setStockCriticalProducts(criticalProducts);

      updateNotifications(criticalProducts, expiringProducts);
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "No se pudieron cargar los productos.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Obtener productos próximos a vencer
  const fetchExpiringProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/productos/por-vencer", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 404) {
        console.warn("⚠️ No hay productos próximos a vencer.");
        setExpiringProducts([]); // 🔹 Establecer como array vacío
        return;
      }
  
      if (!response.ok) {
        throw new Error("Error al obtener productos por vencer.");
      }
  
      const data = await response.json();
  
      // 🔍 Asegurar que `data` sea un array antes de actualizar el estado
      if (Array.isArray(data)) {
        setExpiringProducts(data);
      } else {
        setExpiringProducts([]); // Si la respuesta no es un array, aseguramos que sea vacío
      }
  
      console.log("📅 Productos próximos a vencer:", data);
    } catch (error) {
      console.error("❌ Error al obtener productos por vencer:", error);
      setExpiringProducts([]); // Evitar que se rompa la UI
    }
  };

  useEffect(() => {
  fetchProducts();
  fetchExpiringProducts();
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

      // ✅ Actualizar la lista de productos en el estado
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

      setNotification({ message: "Stock actualizado correctamente.", type: "success" });

      setSelectedProduct(null); // Cerrar formulario de ajuste
    } catch (error) {
      console.error(error);
      setNotification({ message: "Error al actualizar stock.", type: "error" });
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

      {stockCriticalProducts.length > 0 && (
        <Notification
          message={`⚠️ ${stockCriticalProducts.length} productos en stock crítico`}
          type="error"
        />
      )}

      {expiringProducts.length > 0 && (
        <Notification
          message={`⏳ ${expiringProducts.length} productos próximos a vencer`}
          type="warning"
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

      <InventoryTable 
        products={filteredProducts} 
        onSelectProduct={setSelectedProduct} 
        stockCriticalProducts={stockCriticalProducts}
        expiringProducts={expiringProducts}
      />
    </div>
  );
};

export default InventoryLayout;