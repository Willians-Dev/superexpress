import React from "react";
import { generateStockReportPDF } from "../utils/GenerateStockReport.js"; 

const StockReport = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reporte de Stock Crítico</h2>
      <p className="text-gray-600 mb-4">
        Descarga un reporte detallado de los productos que tienen stock crítico.
      </p>
      <button
        onClick={generateStockReportPDF}
        className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Descargar Reporte en PDF
      </button>
    </div>
  );
};

export default StockReport;
