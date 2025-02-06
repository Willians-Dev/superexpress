import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ✅ Función para generar el recibo en PDF
export const generateReceiptPDF = (scannedProducts, totalPrice) => {
  const doc = new jsPDF();

  // ✅ Estilo del encabezado
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text("Recibo de Venta", 14, 15);

  // ✅ Número de transacción (simulado con timestamp)
  const transactionNumber = `#${new Date().getTime()}`;
  doc.setFontSize(12);
  doc.text(`Número de Transacción: ${transactionNumber}`, 14, 25);

  // ✅ Tabla de productos vendidos
  const tableData = scannedProducts.map((product) => [
    product.nombre,
    product.presentacion || "N/A", // Muestra presentación si existe
    product.cantidad,
    `$${product.precio.toFixed(2)}`,
    `$${(product.cantidad * product.precio).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 35,
    head: [["Producto", "Presentación", "Cantidad", "Precio Unitario", "Subtotal"]],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: [40, 40, 40] }, // ✅ Estilo para encabezados
    styles: { fontSize: 10 },
  });

  // ✅ Total de la venta
  doc.setFontSize(14);
  doc.text(`Total: $${totalPrice}`, 14, doc.lastAutoTable.finalY + 10);

  // ✅ Fecha de la venta
  const saleDate = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Fecha: ${saleDate}`, 14, doc.lastAutoTable.finalY + 20);

  // ✅ Guardar PDF
  doc.save(`Recibo_${transactionNumber}.pdf`);
};