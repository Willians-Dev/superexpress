import React from "react";
import { generateReceiptPDF } from "./GenerateReceipt";

const SaleSummary = ({ scannedProducts, saleFinalized }) => {
  const totalPrice = scannedProducts.length > 0
    ? scannedProducts.reduce((total, product) => total + product.cantidad * product.precio, 0).toFixed(2)
    : "0.00";

  return (
    <div className="lg:col-span-4 bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">Resumen de la Venta</h2>
      <p className="text-gray-800 text-lg">
        Total a pagar: <span className="font-bold">${totalPrice}</span>
      </p>

      {/* ✅ Botón para imprimir recibo (solo si la venta se finalizó) */}
      <button
        onClick={() => generateReceiptPDF(scannedProducts, totalPrice)}
        disabled={!saleFinalized}
        className={`w-full mt-2 px-4 py-2 rounded 
          ${saleFinalized ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
      >
        Imprimir Recibo
      </button>
    </div>
  );
};

export default SaleSummary;