import React from "react";

const ScannedProductList = ({ products, onUpdateQuantity, onFinalizeSale }) => {
  return (
    <div>
      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos escaneados.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Presentación</th>
              <th className="px-4 py-2 border">Cantidad</th>
              <th className="px-4 py-2 border">Precio Unitario</th>
              <th className="px-4 py-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{product.nombre}</td>
                <td className="border px-4 py-2">{product.presentacion}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    max={product.stock_actual}
                    value={product.cantidad}
                    onChange={(e) =>
                      onUpdateQuantity(product.producto_id, parseInt(e.target.value) || 1)
                    }
                    className="border px-2 py-1 rounded w-16 text-center"
                  />
                </td>
                <td className="border px-4 py-2">${product.precio.toFixed(2)}</td>
                <td className="border px-4 py-2">${(product.cantidad * product.precio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {products.length > 0 && (
        <button
          onClick={onFinalizeSale}
          className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Finalizar Venta
        </button>
      )}
    </div>
  );
};

export default ScannedProductList;