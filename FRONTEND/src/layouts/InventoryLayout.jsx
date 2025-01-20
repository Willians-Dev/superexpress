// FRONTEND/src/layouts/InventoryLayout.jsx
import React, { useState, useEffect } from "react";
import ProductSearch from "../components/inventory/ProductSearch";
import StockAdjustmentForm from "../components/inventory/StockAdjustmentForm";
import InventoryTable from "../components/inventory/InventoryTable";
import Spinner from "../components/common/Spinner";
import Notification from "../components/common/Notification";

const InventoryLayout = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado. Redirigiendo al login...");
        }

        const response = await fetch("http://localhost:5000/api/productos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          console.warn("Token inválido o expirado. Redirigiendo al login...");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/"; // Redirige al login
          return;
        }

        if (!response.ok) {
          throw new Error("Error al obtener productos.");
        }

        const data = await response.json();
        setProducts(data);
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

    fetchProducts();
  }, []);

  const handleStockUpdate = (productId, adjustment, observation) => {
    const token = localStorage.getItem("token");

    const isStockAdjustment = adjustment !== 0;
    const isStockMinChange = observation.startsWith("Actualización de stock mínimo");

    if (isStockAdjustment) {
      fetch("http://localhost:5000/api/entradas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          producto_id: productId,
          cantidad: adjustment,
          observaciones: observation,
        }),
      }).catch((err) => console.error("Error al registrar la entrada:", err));
    }

    if (isStockMinChange) {
      const newStockMin = parseFloat(observation.match(/\d+(\.\d+)?/)[0]);
      setProducts((prev) =>
        prev.map((p) =>
          p.producto_id === productId ? { ...p, stock_minimo: newStockMin } : p
        )
      );
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.producto_id === productId
            ? { ...p, stock_actual: p.stock_actual + adjustment }
            : p
        )
      );
    }

    setNotification({
      message: "Stock actualizado correctamente.",
      type: "success",
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Gestión de Inventarios</h1>

      {/* Notificación */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      {/* Búsqueda de productos */}
      <ProductSearch
        products={products}
        onSelect={(product) => setSelectedProduct(product)}
      />

      {/* Formulario de ajuste de stock */}
      {selectedProduct && (
        <StockAdjustmentForm
          product={selectedProduct}
          onStockUpdate={handleStockUpdate}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Tabla de inventario */}
      <InventoryTable products={products} />
    </div>
  );
};

export default InventoryLayout;