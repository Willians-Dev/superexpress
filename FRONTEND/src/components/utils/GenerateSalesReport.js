import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateSalesReportPDF = async (fechaInicio, fechaFin) => {
  try {
    if (!fechaInicio || !fechaFin) {
      alert("Selecciona un rango de fechas válido.");
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/ventas/rango?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error("Error al obtener ventas.");

    const ventas = await response.json();
    if (ventas.length === 0) {
      alert("No hay ventas en el rango seleccionado.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Ventas", 80, 10);

    doc.setFontSize(12);
    doc.text(`Desde: ${fechaInicio} Hasta: ${fechaFin}`, 10, 20);

    ventas.forEach((venta, index) => {
      const startY = doc.autoTable.previous.finalY + 10 || 30;
      doc.text(`Venta #${venta.venta_id}`, 10, startY);
      doc.text(`Fecha: ${new Date(venta.fecha_venta).toLocaleString()}`, 10, startY + 5);
      doc.text(`Vendedor: ${venta.usuarios.nombre} ${venta.usuarios.apellido}`, 10, startY + 10);

      autoTable(doc, {
        startY: startY + 15,
        head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
        body: venta.detalles.map((item) => [
          item.productos.nombre,
          item.cantidad,
          `$${item.precio_unitario.toFixed(2)}`,
          `$${(item.cantidad * item.precio_unitario).toFixed(2)}`,
        ]),
      });

      doc.text(`Total: $${venta.total.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 10);
    });

    doc.save(`Reporte_Ventas_${fechaInicio}_${fechaFin}.pdf`);
  } catch (error) {
    console.error("❌ Error al generar el reporte de ventas:", error);
  }
};