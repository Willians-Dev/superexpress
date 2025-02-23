import React, { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';
import ProductSearch from './ProductSearch';
import StockAdjustmentForm from './StockAdjustmentForm';

const InventoryManagement = ({ setStockCritical }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockCriticalProducts, setStockCriticalProducts] = useState([]);
  const [expiringProducts, setExpiringProducts] = useState([]); // 🔹 Productos próximos a vencer

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
        setFilteredProducts(data);

        // 🔴 Filtrar productos en stock crítico
        const criticalProducts = data.filter(p => p.stock_actual <= p.stock_minimo);
        setStockCriticalProducts(criticalProducts);
        setStockCritical(criticalProducts);

      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    const fetchExpiringProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔄 Obtener productos próximos a vencer
        const response = await fetch("http://localhost:5000/api/productos/por-vencer", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) return; // No hay productos próximos a vencer

        const data = await response.json();
        setExpiringProducts(data);
      } catch (error) {
        console.error("Error al obtener productos por vencer:", error);
      }
    };

    fetchProducts();
    fetchExpiringProducts();
  }, []);

  return (
    <div>
      <ProductSearch onSearch={setFilteredProducts} />
      {selectedProduct ? (
        <StockAdjustmentForm
          product={selectedProduct}
          onSave={setFilteredProducts}
          onCancel={() => setSelectedProduct(null)}
        />
      ) : (
        <InventoryTable 
          products={filteredProducts} 
          onSelectProduct={setSelectedProduct} 
          stockCriticalProducts={stockCriticalProducts} 
          expiringProducts={expiringProducts} 
        />
      )}
    </div>
  );
};

export default InventoryManagement;
