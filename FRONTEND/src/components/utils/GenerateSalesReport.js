import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateSalesReportPDF = async (fechaInicio, fechaFin) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/ventas/reporte?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Error al obtener el reporte de ventas.");

    const ventas = await response.json();
    if (ventas.length === 0) {
      alert("No hay ventas en el rango seleccionado.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Ventas", 80, 10);

    autoTable(doc, {
      startY: 20,
      head: [["ID Venta", "Usuario", "Total", "Fecha"]],
      body: ventas.map((venta) => [
        venta.venta_id,
        venta.usuario,
        `$${venta.total.toFixed(2)}`,
        venta.fecha_venta,
      ]),
    });

    doc.save(`Reporte_Ventas_${fechaInicio}_al_${fechaFin}.pdf`);
  } catch (error) {
    console.error("❌ Error al generar el reporte de ventas:", error);
  }
};