import React, { useState, useEffect } from "react";
import Notification from "../common/Notification"; // ✅ Importar notificación

const ProductAdd = ({ onProductAdded }) => {
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    presentacion_id: "",
    descripcion: "",
    codigo_barra: "",
    precio: "",
    stock_actual: "",
    stock_minimo: "",
    fecha_caducidad: "",
    categoria_id: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [presentaciones, setPresentaciones] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // ✅ Obtener categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/categorias", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener categorías");

        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        setNotification({ message: "Error al obtener categorías", type: "error" });
      }
    };

    fetchCategorias();
  }, []);

  // ✅ Obtener presentaciones desde el backend
  useEffect(() => {
    const fetchPresentaciones = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/presentaciones", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener presentaciones");

        const data = await response.json();
        setPresentaciones(data);
      } catch (error) {
        setNotification({ message: "Error al obtener presentaciones", type: "error" });
      }
    };

    fetchPresentaciones();
  }, []);

  // ✅ Validación del precio con formato $0000.00
  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Permitir solo números y punto
    if (!/^\d{0,4}(\.\d{0,2})?$/.test(value)) return; // Validar 4 enteros y 2 decimales
    setNewProduct({ ...newProduct, precio: value });
  };

  // ✅ Validación para solo números enteros en stock
  const handleStockChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // ✅ Generar código de barras automáticamente (CODE 128)
  const handleGenerateBarcode = () => {
    const generatedCode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setNewProduct({ ...newProduct, codigo_barra: generatedCode });
  };

  // ✅ Agregar Producto con validaciones
  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    if (!newProduct.nombre.trim()) {
      setNotification({ message: "El nombre es obligatorio.", type: "error" });
      return;
    }
  
    if (!newProduct.precio || isNaN(parseFloat(newProduct.precio))) {
      setNotification({ message: "El precio debe tener formato válido (ej: $100.00).", type: "error" });
      return;
    }
  
    if (!newProduct.stock_actual || isNaN(parseInt(newProduct.stock_actual))) {
      setNotification({ message: "El stock actual debe ser un número entero.", type: "error" });
      return;
    }
  
    if (!newProduct.stock_minimo || isNaN(parseInt(newProduct.stock_minimo))) {
      setNotification({ message: "El stock mínimo debe ser un número entero.", type: "error" });
      return;
    }
  
    if (!newProduct.codigo_barra.trim()) {
      setNotification({ message: "El código de barras es obligatorio.", type: "error" });
      return;
    }
  
    if (!newProduct.presentacion_id || isNaN(parseInt(newProduct.presentacion_id, 10))) {
      setNotification({ message: "Debe seleccionar una presentación válida.", type: "error" });
      return;
    }
  
    // ✅ Convertir presentacion_id a número antes de enviarlo
    const formattedProduct = {
      ...newProduct,
      presentacion_id: parseInt(newProduct.presentacion_id, 10), // ✅ Convertir a número
    };
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/productos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedProduct),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes("duplicate key value violates unique constraint")) {
          throw new Error("El código de barras ya está en uso. Prueba con otro.");
        }
        throw new Error(`Error al agregar producto: ${response.status} - ${errorText}`);
      }
  
      const addedProduct = await response.json();
      
      if (typeof onProductAdded === "function") {
        onProductAdded(addedProduct);
      }
  
      setNotification({ message: "Producto agregado con éxito.", type: "success" });
  
      // ✅ Resetear formulario
      setNewProduct({
        nombre: "",
        presentacion_id: "",
        descripcion: "",
        codigo_barra: "",
        precio: "",
        stock_actual: "",
        stock_minimo: "",
        fecha_caducidad: "",
        categoria_id: "",
      });

       // ✅ Cerrar el formulario después de 1 segundo
      setTimeout(() => {
        if (onClose && typeof onClose === "function") {
          onClose();
        }
      }, 1000);
  
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-lg font-bold mb-4">Agregar Producto</h2>

      {/* ✅ Notificación de errores y éxito */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
        <input name="nombre" placeholder="Nombre" value={newProduct.nombre} onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })} required className="border border-gray-300 p-2 rounded w-full"/>

        <div className="flex items-center space-x-2">
          <input name="codigo_barra" placeholder="Código de Barras" value={newProduct.codigo_barra} onChange={(e) => setNewProduct({ ...newProduct, codigo_barra: e.target.value })} required className="border border-gray-300 p-2 rounded w-full"/>
          <button type="button" onClick={handleGenerateBarcode} className="bg-blue-500 text-white px-3 py-2 rounded">
            +
          </button>
        </div>

        <select 
          name="presentacion_id" 
          value={newProduct.presentacion_id} 
          onChange={(e) => setNewProduct({ ...newProduct, presentacion_id: e.target.value })}
          required
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option value="">Seleccionar Presentación</option>
          {presentaciones.map((p) => (
            <option key={p.presentacion_id} value={p.presentacion_id}>  {/* ✅ Ahora envía el ID de la presentación */}
              {p.nombre}
            </option>
          ))}
        </select>

        <select name="categoria_id" value={newProduct.categoria_id} onChange={(e) => setNewProduct({ ...newProduct, categoria_id: e.target.value })} required className="border border-gray-300 p-2 rounded w-full">
          <option value="">Seleccionar Categoría</option>
          {categorias.map((c) => <option key={c.categoria_id} value={c.categoria_id}>{c.nombre}</option>)}
        </select>

        <input name="precio" placeholder="Precio ($0000.00)" value={newProduct.precio} onChange={handlePriceChange} required className="border border-gray-300 p-2 rounded w-full"/>

        <input type="date" name="fecha_caducidad" value={newProduct.fecha_caducidad} onChange={(e) => setNewProduct({ ...newProduct, fecha_caducidad: e.target.value })} className="border border-gray-300 p-2 rounded w-full"/>

        <input name="stock_actual" placeholder="Stock Actual" value={newProduct.stock_actual} onChange={handleStockChange} required className="border border-gray-300 p-2 rounded w-full"/>

        <input name="stock_minimo" placeholder="Stock Mínimo" value={newProduct.stock_minimo} onChange={handleStockChange} required className="border border-gray-300 p-2 rounded w-full"/>

        <textarea name="descripcion" placeholder="Descripción" value={newProduct.descripcion} onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })} className="border border-gray-300 p-2 rounded col-span-2"></textarea>

        <button type="submit" className="col-span-2 bg-green-500 text-white px-4 py-2 rounded">Agregar Producto</button>
      </form>
    </div>
  );
};

export default ProductAdd;