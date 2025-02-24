import React, { useState, useEffect } from "react";
import ProductScanner from "../components/product/ProductScanner";
import ScannedProductList from "../components/operations/ScannedProductList";
import SaleSummary from "../components/operations/SaleSummary";
import Notifications from "../components/operations/Notifications";
import Notification from "../components/common/Notification";

const OperationLayout = () => {
  const [scannedProducts, setScannedProducts] = useState([]);
  const [error, setError] = useState("");
  const [saleFinalized, setSaleFinalized] = useState(false);
  const [alerts, setAlerts] = useState([]); // 🔴 Notificaciones combinadas de stock crítico y productos por vencer
  const [notification, setNotification] = useState(null);
  const [ventaId, setVentaId] = useState(null);

  // ✅ Obtener productos en stock crítico
  const fetchStockCriticalProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/productos/stock-critico", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        console.warn("⚠️ No se pudo obtener productos en stock crítico.");
        return [];
      }
  
      const data = await response.json();
      return Array.isArray(data) ? data : []; // ✅ Asegurar que siempre devuelva un array
    } catch (error) {
      console.error("❌ Error al obtener productos en stock crítico:", error);
      return [];
    }
  };
  
  // ✅ Obtener productos próximos a vencer
  const fetchExpiringProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/productos/por-vencer", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
  
      if (!response.ok || !Array.isArray(data)) {
        console.warn("⚠️ No hay productos próximos a vencer.");
        return [];
      }
  
      return data;
    } catch (error) {
      console.error("❌ Error al obtener productos por vencer:", error);
      return [];
    }
  };

  // ✅ Obtener todas las alertas al cargar la página
  useEffect(() => {
    const fetchAlerts = async () => {
      const stockCriticalAlerts = await fetchStockCriticalProducts();
      const expiringProductAlerts = await fetchExpiringProducts();

      const alerts = [];

      // 🔹 Construir mensajes de alerta
      stockCriticalAlerts.forEach((product) =>
        alerts.push(`⚠️ El producto "${product.nombre}" está en stock crítico (${product.stock_actual} disponibles).`)
      );

      expiringProductAlerts.forEach((product) =>
        alerts.push(`⏳ El producto "${product.nombre}" vence pronto (${product.fecha_caducidad}).`)
      );

      setAlerts(alerts);
    };

    fetchAlerts();
  }, []);

  // ✅ Agregar producto escaneado
  const handleAddProduct = (product) => {
    const existingProduct = scannedProducts.find(
      (p) => p.producto_id === product.producto_id
    );

    if (existingProduct) {
      setScannedProducts((prev) =>
        prev.map((p) =>
          p.producto_id === product.producto_id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      );
    } else {
      setScannedProducts([...scannedProducts, { ...product, cantidad: 1 }]);
    }

    setError("");
  };

  // ✅ Finalizar venta
  const handleFinalizeSale = async () => {
    try {
      const token = localStorage.getItem("token");

      for (const product of scannedProducts) {
        if (product.cantidad > product.stock_actual) {
          setNotification({
            message: `❌ No hay suficiente stock para ${product.nombre}.`,
            type: "error",
          });
          return;
        }
      }

      const response = await fetch(`http://localhost:5000/api/ventas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: JSON.parse(localStorage.getItem("user")).usuario_id,
          productos: scannedProducts,
        }),
      });

      if (!response.ok) throw new Error("Error al registrar la venta");

      const { venta_id } = await response.json();
      setSaleFinalized(true);
      setVentaId(venta_id);
      setScannedProducts([]);

      setNotification({
        message: "✅ Venta realizada con éxito.",
        type: "success",
      });

      // 🔄 Volver a consultar stock crítico y productos por vencer después de la venta
      const stockCriticalAlerts = await fetchStockCriticalProducts();
      const expiringProductAlerts = await fetchExpiringProducts();
      setAlerts([...stockCriticalAlerts, ...expiringProductAlerts]);
    } catch (error) {
      console.error("Error al finalizar la venta:", error);
      setNotification({
        message: "❌ Error al registrar la venta.",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Operaciones</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 🔴 Notificaciones FIJAS */}
        <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
          <Notifications alerts={alerts} />
        </div>

        {/* Escanear productos */}
        <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Escanear Productos</h2>
          <ProductScanner onProductScanned={handleAddProduct} setError={setError} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Productos escaneados */}
        <div className="lg:col-span-8 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Productos Escaneados</h2>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}
          <ScannedProductList
            products={scannedProducts}
            onFinalizeSale={handleFinalizeSale}
          />
        </div>

        {/* Resumen de la venta */}
        <SaleSummary
          scannedProducts={scannedProducts}
          saleFinalized={saleFinalized}
          ventaId={ventaId}
        />
      </div>
    </div>
  );
};

export default OperationLayout;