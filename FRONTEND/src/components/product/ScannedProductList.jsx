import React from "react";

const ScannedProductList = ({ products, onFinalizeSale, onUpdateQuantity }) => {
  return (
    <div>
      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos escaneados.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Cantidad</th>
              <th className="px-4 py-2 border">Precio Unitario</th>
              <th className="px-4 py-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{product.nombre}</td>
                
                {/* ✅ Input para modificar la cantidad */}
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={product.cantidad}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      if (!isNaN(newQuantity) && newQuantity >= 1) {
                        onUpdateQuantity(product.producto_id, newQuantity);
                      }
                    }}
                    className="border rounded px-2 py-1 w-20 text-center"
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
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600"
        >
          Finalizar Venta
        </button>
      )}
    </div>
  );
};

export default ScannedProductList;