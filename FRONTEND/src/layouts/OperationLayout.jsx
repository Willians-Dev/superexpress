import React, { useState } from "react";
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
  const [ventaId, setVentaId] = useState(null); // ✅ Guardar el ID de la venta

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

    if (product.stock_actual - 1 <= product.stock_minimo) {
      setAlerts((prev) => [
        ...prev,
        `⚠️ El producto ${product.nombre} tiene stock crítico.`,
      ]);
    }

    setError("");
  };

  // ✅ Actualizar cantidad en la tabla de productos escaneados
  const handleUpdateQuantity = (productId, newQuantity) => {
    setScannedProducts((prev) =>
      prev.map((p) =>
        p.producto_id === productId ? { ...p, cantidad: newQuantity } : p
      )
    );
  };

  // ✅ Finalizar venta
  const handleFinalizeSale = async () => {
    try {
      const token = localStorage.getItem("token");
      const usuario = JSON.parse(localStorage.getItem("user"));
  
      if (!usuario) {
        setNotification({ message: "❌ Usuario no autenticado.", type: "error" });
        return;
      }
  
      if (scannedProducts.length === 0) {
        setNotification({ message: "⚠️ No hay productos para vender.", type: "warning" });
        return;
      }
  
      console.log("📦 Enviando datos de venta:", scannedProducts);
  
      const response = await fetch("http://localhost:5000/api/ventas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuario.usuario_id,
          productos: scannedProducts, 
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar la venta");
      }
  
      const { venta_id } = await response.json();
      setSaleFinalized(true);
      setVentaId(venta_id);
      setScannedProducts([]);
  
      setNotification({ message: "✅ Venta realizada con éxito.", type: "success" });
  
    } catch (error) {
      console.error("❌ Error al finalizar la venta:", error);
      setNotification({ message: "❌ Error al registrar la venta.", type: "error" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Operaciones</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Escanear Productos</h2>
          <ProductScanner onProductScanned={handleAddProduct} setError={setError} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <Notifications alerts={alerts} />

        <div className="lg:col-span-8 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Productos Escaneados</h2>
          {notification && (
            <Notification type={notification.type} message={notification.message} onClose={() => setNotification(null)} />
          )}
          <ScannedProductList products={scannedProducts} onUpdateQuantity={handleUpdateQuantity} onFinalizeSale={handleFinalizeSale} />
        </div>

        <SaleSummary scannedProducts={scannedProducts} saleFinalized={saleFinalized} ventaId={ventaId} />
      </div>
    </div>
  );
};

export default OperationLayout;