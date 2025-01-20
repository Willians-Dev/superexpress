// FRONTEND/src/components/reports/InventoryReport.jsx
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InventoryReport = ({ products }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(16);
    doc.text("Reporte de Inventario Actual", 105, 20, { align: "center" });

    // Tabla de productos
    const tableData = products.map((product) => [
      product.nombre,
      product.categoria || "Sin categoría",
      product.presentacion || "Sin presentación",
      product.stock_actual,
      product.stock_minimo,
      `$${product.precio.toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [
        ["Producto", "Categoría", "Presentación", "Stock Actual", "Stock Mínimo", "Precio"],
      ],
      body: tableData,
      startY: 30,
    });

    // Guardar como PDF
    doc.save("reporte_inventario.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Descargar Reporte de Inventario
    </button>
  );
};

export default InventoryReport;