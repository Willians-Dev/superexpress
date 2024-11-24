// FRONTEND/src/layouts/OperationLayout.jsx
import React from 'react';

const OperationLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-4 h-screen p-6 bg-gray-100">
      {/* Div horizontal superior izquierda */}
      <div className="col-span-6 bg-blue-100 shadow-md rounded-md p-4 flex items-center justify-center">
        <p className="text-blue-600">Div Superior Izquierdo</p>
      </div>
      {/* Div horizontal superior derecha */}
      <div className="col-span-6 bg-green-100 shadow-md rounded-md p-4 flex items-center justify-center">
        <p className="text-green-600">Div Superior Derecho</p>
      </div>
      {/* Div vertical inferior arriba */}
      <div className="col-span-12 bg-yellow-100 shadow-md rounded-md p-4 flex items-center justify-center">
        <p className="text-yellow-600">Div Inferior Arriba</p>
      </div>
      {/* Div vertical inferior abajo */}
      <div className="col-span-12 bg-red-100 shadow-md rounded-md p-4 flex items-center justify-center">
        <p className="text-red-600">Div Inferior Abajo</p>
      </div>
    </div>
  );
};

export default OperationLayout;