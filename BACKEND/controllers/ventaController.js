// controllers/ventaController.js
import Inventario from '../models/inventarioModel.js';

export const registrarVenta = async (req, res) => {
  const { productos, usuario_id } = req.body; // Lista de productos y usuario que realiza la venta

  if (!productos || productos.length === 0) {
    return res.status(400).json({ message: 'Debe incluir al menos un producto en la venta' });
  }

  try {
    for (const producto of productos) {
      const { producto_id, cantidad } = producto;

      // Registrar salida en el inventario
      await Inventario.registrarSalida({
        producto_id,
        cantidad,
        usuario_id,
        observaciones: 'Venta realizada',
      });
    }

    res.status(201).json({ message: 'Venta registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: `Error al registrar la venta: ${error.message}` });
  }
};