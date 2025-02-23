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
  try {
    const data = await Producto.actualizarProducto(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { data: productos, error } = await supabase
      .from("productos")
      .select("producto_id, nombre, stock_actual, stock_minimo")
      .lte("stock_actual", supabase.raw("stock_minimo")); // 🔹 Productos donde el stock_actual <= stock_minimo

    if (error) {
      console.error("❌ Error en la consulta de productos críticos:", error);
      throw new Error(error.message);
    }

    if (!productos || productos.length === 0) {
      return res.status(404).json({ message: "No hay productos en stock crítico." });
    }

    res.status(200).json(productos);
  } catch (error) {
    console.error("❌ Error en obtenerProductosStockCritico:", error.message);
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