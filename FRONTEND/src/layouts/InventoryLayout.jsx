// FRONTEND/src/layouts/InventoryLayout.jsx
import React, { useState, useEffect } from "react";
import ProductSearch from "../components/inventory/ProductSearch";
import StockAdjustmentForm from "../components/inventory/StockAdjustmentForm";
import InventoryTable from "../components/inventory/InventoryTable";

const InventoryLayout = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/productos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Error al obtener productos.");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleStockUpdate = (productId, adjustment, observation) => {
    // Lógica para registrar el ajuste de inventario
    const token = localStorage.getItem("token");

    // Determinar si es ajuste de stock o cambio en stock mínimo
    const isAdjustment = adjustment !== 0;
    const isStockMinChange = observation.startsWith("Actualización de stock mínimo");

    if (isAdjustment) {
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
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Gestión de Inventarios</h1>

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