// FRONTEND/src/components/Barcode.jsx
import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ code }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (code && svgRef.current) {
      JsBarcode(svgRef.current, code, {
        format: "CODE128",     // Usa el formato CODE128
        displayValue: false,    // Muestra el número debajo del código de barras
        height: 40,            // Altura del código de barras
        width: 1.5,            // Ancho de las barras
      });
    }
  }, [code]);

  return <svg ref={svgRef}></svg>;
};

export default Barcode;