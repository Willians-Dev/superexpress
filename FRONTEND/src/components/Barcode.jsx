// FRONTEND/src/components/Barcode.jsx
import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ code }) => {
  const svgRef = useRef(null);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (code && svgRef.current) {
      JsBarcode(svgRef.current, code, {
        format: "CODE128",
        displayValue: false, // Ocultamos el número inicialmente
        height: 40,
        width: 1.5,
      });
    }
  }, [code]);

  // Manejar la visibilidad del código al hacer clic
  const handleBarcodeClick = () => {
    setShowCode(true);
    setTimeout(() => {
      setShowCode(false);
    }, 10000); // Ocultar después de 10 segundos
  };

  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={handleBarcodeClick}>
      <svg ref={svgRef}></svg>
      {showCode && (
        <span className="mt-2 text-lg font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded">
          {code}
        </span>
      )}
    </div>
  );
};

export default Barcode;