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
  const [alerts, setAlerts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [ventaId, setVentaId] = useState(null);

  // ✅ Obtener notificaciones del inventario y la API
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const savedAlerts = localStorage.getItem("inventoryAlerts");
        const inventoryAlerts = savedAlerts ? JSON.parse(savedAlerts) : [];

        // 🔹 Obtener productos en stock crítico y por vencer
        const token = localStorage.getItem("token");
        const [stockResponse, expiringResponse] = await Promise.all([
          fetch("http://localhost:5000/api/productos/stock-critico", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/productos/por-vencer", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const stockData = stockResponse.ok ? await stockResponse.json() : [];
        const expiringData = expiringResponse.ok ? await expiringResponse.json() : [];

        const stockCriticalAlerts = Array.isArray(stockData)
          ? stockData.map((p) => `⚠️ "${p.nombre}" en stock crítico (${p.stock_actual} disponibles).`)
          : [];
        const expiringProductAlerts = Array.isArray(expiringData)
          ? expiringData.map((p) => `⏳ "${p.nombre}" vence pronto (${p.fecha_caducidad}).`)
          : [];

        setAlerts([...inventoryAlerts, ...stockCriticalAlerts, ...expiringProductAlerts]);
      } catch (error) {
        console.error("❌ Error al obtener alertas:", error);
      }
    };

    fetchAlerts();
  }, []);

  // ✅ Sonido al escanear producto
  const playBeepSound = () => {
    const beep = new Audio("/beep.mp3");
    beep.play().catch((error) => console.error("Error al reproducir sonido:", error));
  };

  // ✅ Agregar producto escaneado con sonido
  const handleAddProduct = (product) => {
    playBeepSound();

    const existingProduct = scannedProducts.find((p) => p.producto_id === product.producto_id);
    if (existingProduct) {
      setScannedProducts((prev) =>
        prev.map((p) =>
          p.producto_id === product.producto_id ? { ...p, cantidad: p.cantidad + 1 } : p
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

      // 🔄 Actualizar alertas después de la venta
      const updatedAlerts = JSON.parse(localStorage.getItem("inventoryAlerts")) || [];
      setAlerts(updatedAlerts);
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
      <h1 className="text-3xl font-bold mb-6 text-left">Operaciones</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 🔹 1. Escanear Productos (Izquierda) */}
        <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Escanear Productos</h2>
          <ProductScanner onProductScanned={handleAddProduct} setError={setError} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* 🔹 2. Notificaciones (Arriba Derecha) */}
        <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
          <Notifications alerts={alerts} />
        </div>

        {/* 🔹 3. Productos Escaneados (Abajo Izquierda) */}
        <div className="lg:col-span-8 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Productos Escaneados</h2>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}
          <ScannedProductList products={scannedProducts} onFinalizeSale={handleFinalizeSale} />
        </div>

        {/* 🔹 4. Resumen de la Venta (Abajo Derecha) */}
        <div className="lg:col-span-4 bg-white shadow-md rounded-md p-6">
          <SaleSummary
            scannedProducts={scannedProducts}
            saleFinalized={saleFinalized}
            ventaId={ventaId}
          />
        </div>
      </div>
    </div>
  );
};

export default OperationLayout;