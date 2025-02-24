import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReceiptPDF = async (ventaId) => {
  if (!ventaId) {
    console.error("❌ Error: ventaId no está definido.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/ventas/${ventaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al obtener los detalles de la venta.");

    const { venta, detalles } = await response.json();

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Recibo de Venta", 80, 10);

    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(venta.fecha_venta).toLocaleString()}`, 10, 20);
    doc.text(`ID Venta: ${venta.venta_id}`, 10, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Nombre", "Cantidad", "Precio Unitario", "Subtotal"]],
      body: detalles.map((item) => [
        item.productos.nombre, 
        item.cantidad,
        `$${item.precio_unitario.toFixed(2)}`,
        `$${(item.cantidad * item.precio_unitario).toFixed(2)}`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [30, 144, 255] },
    });

    doc.text(`Total a Pagar: $${venta.total.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 10);
    doc.save(`Recibo_Venta_${ventaId}.pdf`);

  } catch (error) {
    console.error("❌ Error al generar el recibo:", error);
  }
};