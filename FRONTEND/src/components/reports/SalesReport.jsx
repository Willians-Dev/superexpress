import React, { useState } from "react";
import { generateSalesReportPDF } from "../utils/GenerateSalesReport.js"; 

const SalesReport = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Generar Reporte de Ventas</h2>
      <p className="text-gray-600 mb-4">
        Selecciona un rango de fechas para generar el reporte en PDF.
      </p>

      <div className="flex gap-4">
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      <button
        onClick={() => generateSalesReportPDF(fechaInicio, fechaFin)}
        className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Descargar Reporte en PDF
      </button>
    </div>
  );
};

export default SalesReport;
