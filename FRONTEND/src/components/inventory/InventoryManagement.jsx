import React, { useState, useEffect } from "react";
import ProductSearch from "./ProductSearch";
import StockAdjustmentForm from "./StockAdjustmentForm";
import InventoryTable from "./InventoryTable";

const InventoryManagement = () => {
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
    const updatedProducts = products.map((product) =>
      product.producto_id === productId
        ? { ...product, stock_actual: product.stock_actual + adjustment }
        : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Gestión de Inventarios</h1>

      <ProductSearch
        products={products}
        onSelect={(product) => setSelectedProduct(product)}
      />

      {selectedProduct && (
        <StockAdjustmentForm
          product={selectedProduct}
          onStockUpdate={handleStockUpdate}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <InventoryTable products={products} />
    </div>
  );
};

export default InventoryManagement;