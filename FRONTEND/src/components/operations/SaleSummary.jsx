import React from "react";
import { generateReceiptPDF } from "../utils/GenerateReceipt";

const SaleSummary = ({ scannedProducts, saleFinalized, ventaId }) => {
  const totalPrice = scannedProducts.reduce(
    (total, product) => total + product.cantidad * product.precio,
    0
  ).toFixed(2);

  return (
    <div className="lg:col-span-4 bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">Resumen de la Venta</h2>
      <p className="text-gray-800 text-lg">
        Total a pagar: <span className="font-bold">${totalPrice}</span>
      </p>

      {saleFinalized && ventaId && (
        <button
          onClick={() => generateReceiptPDF(ventaId)}
          className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Imprimir Recibo
        </button>
      )}
    </div>
  );
};

export default SaleSummary;