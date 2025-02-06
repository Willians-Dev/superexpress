import supabase from "../config/db.js";

// ✅ Registrar una nueva venta
export const registrarVenta = async (req, res) => {
  const { usuario_id, productos } = req.body; // Recibe el usuario y productos vendidos
  try {
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

    res.status(201).json({ message: "Venta registrada con éxito", venta_id: venta.venta_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};