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
                <td className="border px-4 py-2 flex items-center gap-2">
                  {/* Botón para disminuir */}
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                    onClick={() => onUpdateQuantity(product.producto_id, Math.max(1, product.cantidad - 1))}
                    disabled={product.cantidad <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock_actual}
                    value={product.cantidad}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1;
                      if (newQuantity > 0 && newQuantity <= product.stock_actual) {
                        onUpdateQuantity(product.producto_id, newQuantity);
                      }
                    }}
                    className="border px-2 py-1 rounded w-16 text-center"
                  />
                  {/* Botón para aumentar */}
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded disabled:opacity-50"
                    onClick={() => onUpdateQuantity(product.producto_id, Math.min(product.stock_actual, product.cantidad + 1))}
                    disabled={product.cantidad >= product.stock_actual}
                  >
                    +
                  </button>
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