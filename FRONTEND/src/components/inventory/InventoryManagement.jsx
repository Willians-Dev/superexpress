import React, { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';
import ProductSearch from './ProductSearch';
import StockAdjustmentForm from './StockAdjustmentForm';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(lowerCaseQuery) ||
        product.categoria.toLowerCase().includes(lowerCaseQuery) ||
        product.codigo_barra.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleStockUpdate = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.producto_id === updatedProduct.producto_id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setSelectedProduct(null);
  };

  const onSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <ProductSearch onSearch={handleSearch} />
      {selectedProduct ? (
        <StockAdjustmentForm
          product={selectedProduct}
          onSave={handleStockUpdate}
          onCancel={() => setSelectedProduct(null)}
        />
      ) : (
        <InventoryTable products={filteredProducts} onSelectProduct={onSelectProduct} />
      )}
    </div>
  );
};

export default InventoryManagement;