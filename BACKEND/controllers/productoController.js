// controllers/productoController.js
import Producto from '../models/productoModel.js';
import supabase from '../config/db.js';

export const crearProducto = async (req, res) => {
  try {
    console.log("🔍 Datos recibidos en el backend:", req.body);
    const data = await Producto.crearProducto(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Error al agregar producto:", error.message);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const data = await Producto.obtenerProductos();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Producto.obtenerProductoPorId(id);
    if (!data) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { stock_actual, stock_minimo, fecha_caducidad } = req.body;

  try {
    console.log("📥 Datos recibidos para actualizar:", { id, stock_actual, stock_minimo, fecha_caducidad });

    const productoId = parseInt(id, 10);
    if (isNaN(productoId)) {
      console.error("❌ ID inválido recibido:", id);
      return res.status(400).json({ message: "ID inválido" });
    }

    const stockActualNumber = Number(stock_actual);
    const stockMinimoNumber = Number(stock_minimo);

    if (isNaN(stockActualNumber) || isNaN(stockMinimoNumber)) {
      console.error("❌ Stock no es un número válido:", stock_actual, stock_minimo);
      return res.status(400).json({ message: "Stock debe ser un número válido" });
    }

    console.log("🔄 Actualizando producto en Supabase...");

    const { data, error } = await supabase
      .from("productos")
      .update({ stock_actual: stockActualNumber, stock_minimo: stockMinimoNumber, fecha_caducidad })
      .eq("producto_id", productoId)
      .select();

    if (error) {
      console.error("❌ Error en Supabase:", error);
      return res.status(500).json({ message: "Error en Supabase", error: error.message });
    }

    console.log("✅ Producto actualizado correctamente:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error en actualizarProducto:", error);
    res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  console.log("🔍 ID recibido para eliminar:", id);

  try {
    const productoId = parseInt(id, 10);
    if (isNaN(productoId)) {
      console.log("❌ ID inválido recibido:", id);
      return res.status(400).json({ message: "ID inválido" });
    }

    const productoEliminado = await Producto.eliminarProducto(productoId);

    if (!productoEliminado) {
      console.log("❌ Producto no encontrado en la base de datos.");
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    console.log("✅ Producto eliminado correctamente.");
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const obtenerProductoPorCodigoBarra = async (req, res) => {
  const { codigo_barra } = req.params;
  try {
    const data = await Producto.obtenerProductoPorCodigoBarra(codigo_barra);
    if (!data) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Obtener productos en stock crítico
export const obtenerProductosStockCritico = async (req, res) => {
  try {
    console.log("🔍 Consultando productos en stock crítico...");

    // Consulta directa con comparación numérica usando SQL
    const { data: productos, error } = await supabase
      .rpc('obtener_productos_stock_critico');

    if (error) {
      console.error("❌ Error en la consulta de productos críticos:", error);
      return res.status(500).json({ message: "Error en Supabase", error: error.message });
    }

    if (!productos || productos.length === 0) {
      console.warn("⚠️ No hay productos en stock crítico.");
      return res.status(200).json([]); // ✅ Evitar error 404 si no hay productos
    }

    console.log(`✅ Productos en stock crítico encontrados: ${productos.length}`);
    res.status(200).json(productos);
  } catch (error) {
    console.error("❌ Error en obtenerProductosStockCritico:", error);
    res.status(500).json({ message: "Error al obtener productos en stock crítico", error: error.message });
  }
};

// ✅ Obtener productos por vencer (en los próximos 14 días)
export const obtenerProductosPorVencer = async (req, res) => {
  try {
    console.log("🔍 Consultando productos próximos a vencer...");

    const fechaActual = new Date().toISOString().split("T")[0];
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 14);
    const fechaLimiteStr = fechaLimite.toISOString().split("T")[0];

    console.log("📅 Fecha actual:", fechaActual);
    console.log("📅 Fecha límite:", fechaLimiteStr);

    const { data: productos, error } = await supabase
      .from("productos")
      .select("producto_id, nombre, fecha_caducidad, sensible_vencimiento")
      .eq("sensible_vencimiento", true)
      .gte("fecha_caducidad", fechaActual)
      .lte("fecha_caducidad", fechaLimiteStr);

    if (error) {
      console.error("❌ Error en la consulta de productos por vencer:", error);
      return res.status(500).json({ message: "Error en Supabase", error: error.message });
    }

    if (!productos || productos.length === 0) {
      console.warn("⚠️ No hay productos próximos a vencer.");
      return res.status(200).json({ message: "No hay productos próximos a vencer." }); // ✅ Evitar error 404
    }

    console.log(`✅ Productos encontrados: ${productos.length}`);
    res.status(200).json(productos);
  } catch (error) {
    console.error("❌ Error en obtenerProductosPorVencer:", error);
    res.status(500).json({ message: "Error al obtener productos próximos a vencer", error: error.message });
  }
};

export const obtenerVentasPorFecha = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;

    console.log("🔍 Consultando ventas entre:", fecha_inicio, fecha_fin);

    if (!fecha_inicio || !fecha_fin) {
      return res.status(400).json({ message: "Debes proporcionar ambas fechas." });
    }

    // Llamar a la función de Supabase
    const { data, error } = await supabase
      .rpc('obtener_reporte_ventas', { fecha_inicio, fecha_fin });

    if (error) {
      console.error("❌ Error en Supabase:", error);
      return res.status(500).json({ message: "Error en Supabase", error: error.message });
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ No hay ventas en el rango seleccionado.");
      return res.status(200).json([]); // No hay ventas
    }

    console.log(`✅ Ventas encontradas: ${data.length}`);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error en obtenerVentasPorFecha:", error);
    res.status(500).json({ message: "Error al obtener el reporte de ventas", error: error.message });
  }
};
