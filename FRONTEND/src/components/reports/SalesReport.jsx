import React, { useState } from "react";
import { generateSalesReportPDF } from "../utils/GenerateSalesReport";

const SalesReport = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleGenerateReport = () => {
    if (!fechaInicio || !fechaFin) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }
    generateSalesReportPDF(fechaInicio, fechaFin);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Generar Reporte de Ventas</h2>
      <div className="mb-3">
        <label className="block">Fecha Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-3">
        <label className="block">Fecha Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleGenerateReport}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generar Reporte PDF
      </button>
    </div>
  );
};

export default SalesReport;