import supabase from "../config/db.js";

// ✅ Registrar una nueva venta y actualizar stock
export const registrarVenta = async (req, res) => {
  const { usuario_id, productos } = req.body;
  console.log("📩 Recibiendo venta:", req.body);

  try {
    if (!usuario_id || !productos || productos.length === 0) {
      throw new Error("❌ Datos incompletos. Asegúrate de enviar usuario_id y productos.");
    }

    const total = productos.reduce((sum, p) => sum + p.cantidad * p.precio, 0);

    // ✅ Insertar la venta en la tabla "ventas"
    const { data: venta, error: ventaError } = await supabase
      .from("ventas")
      .insert([{ usuario_id, total }])
      .select("venta_id")
      .single();

    if (ventaError) throw new Error(ventaError.message);

    // ✅ Insertar los productos en "venta_detalle"
    const detalles = productos.map((p) => ({
      venta_id: venta.venta_id,
      producto_id: p.producto_id,
      cantidad: p.cantidad,
      precio_unitario: p.precio,
    }));

    const { error: detalleError } = await supabase.from("venta_detalle").insert(detalles);
    if (detalleError) throw new Error(detalleError.message);

    // ✅ Actualizar stock en la tabla "productos"
    for (const product of productos) {
      const { error: stockError } = await supabase
        .from("productos")
        .update({ stock_actual: product.stock_actual - product.cantidad }) // ✅ Se actualiza el stock
        .eq("producto_id", product.producto_id);

      if (stockError) throw new Error(`Error al actualizar stock de ${product.nombre}`);
    }

    res.status(201).json({ message: "✅ Venta registrada con éxito", venta_id: venta.venta_id });

  } catch (error) {
    console.error("❌ Error al registrar la venta:", error.message);
    res.status(500).json({ message: "❌ Error en el servidor al registrar la venta", error: error.message });
  }
};

// ✅ Obtener detalles de una venta específica
export const obtenerVenta = async (req, res) => {
  const { venta_id } = req.params;
  try {
    const { data: venta, error: ventaError } = await supabase
      .from("ventas")
      .select("*")
      .eq("venta_id", venta_id)
      .single();

    if (ventaError || !venta) throw new Error("Venta no encontrada");

    const { data: detalles, error: detallesError } = await supabase
      .from("venta_detalle")
      .select("cantidad, precio_unitario, producto_id, productos(nombre)")
      .eq("venta_id", venta_id);

    if (detallesError) throw new Error("Error al obtener detalles de la venta");

    res.status(200).json({ venta, detalles });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los detalles de la venta", error: error.message });
  }
};

// ✅ Obtener ventas en un rango de fechas
export const obtenerVentasPorRango = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  console.log("📌 Recibiendo solicitud de ventas con rango:", { fechaInicio, fechaFin });

  try {
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ message: "❌ Las fechas son requeridas" });
    }

    const { data: ventas, error: ventasError } = await supabase
      .from("ventas")
      .select(`
        venta_id,
        fecha_venta,
        total,
        usuarios (
          nombre,
          apellido
        ),
        venta_detalle (
          cantidad,
          precio_unitario,
          productos (
            nombre
          )
        )
      `)
      .gte("fecha_venta", `${fechaInicio} 00:00:00`)
      .lte("fecha_venta", `${fechaFin} 23:59:59`);

    console.log("📌 Ventas obtenidas:", ventas);  // ✅ Agregado para ver los datos que devuelve Supabase

    if (ventasError) {
      console.error("❌ Error en la consulta de ventas:", ventasError);
      throw new Error(ventasError.message);
    }

    if (!ventas || ventas.length === 0) {
      return res.status(404).json({ message: "⚠ No se encontraron ventas en el rango de fechas" });
    }

    res.status(200).json(ventas);

  } catch (error) {
    console.error("❌ Error en obtenerVentasPorRango:", error.message);
    res.status(500).json({ message: "Error al obtener ventas", error: error.message });
  }
};
