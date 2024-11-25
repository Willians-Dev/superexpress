import React from 'react';

const ScannedProductList = ({ products, onFinalizeSale }) => {
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
              <th className="px-4 py-2 border">Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{product.nombre}</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">${product.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {products.length > 0 && (
        <button
          onClick={onFinalizeSale}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Finalizar Venta
        </button>
      )}
    </div>
  );
};

export default ScannedProductList;