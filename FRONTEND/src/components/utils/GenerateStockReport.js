import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateStockReportPDF = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/productos/stock-critico", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al obtener productos en stock crítico.");

    const productos = await response.json();
    if (productos.length === 0) {
      alert("No hay productos en stock crítico.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Productos con Stock Crítico", 50, 10);

    autoTable(doc, {
      startY: 20,
      head: [["Producto", "Stock Actual", "Stock Mínimo", "Precio", "Fecha de Caducidad"]],
      body: productos.map((item) => [
        item.nombre,
        item.stock_actual,
        item.stock_minimo,
        `$${parseFloat(item.precio).toFixed(2)}`,
        item.fecha_caducidad,
      ]),
    });

    doc.save("Reporte_Stock_Critico.pdf");
  } catch (error) {
    console.error("❌ Error al generar el reporte de stock crítico:", error);
  }
};