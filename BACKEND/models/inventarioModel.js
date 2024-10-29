// models/inventarioModel.js
import supabase from '../config/db.js';

const Inventario = {
  // Registrar una entrada de producto
  async registrarEntrada({ producto_id, cantidad, usuario_id, observaciones }) {
    // Insertar la entrada en la tabla 'entradas'
    const { data, error } = await supabase
      .from('entradas')
      .insert([{ producto_id, cantidad, usuario_id, observaciones }]);

    if (error) throw new Error(error.message);

    // Actualizar el stock actual del producto
    await this.actualizarStock(producto_id, cantidad, 'entrada');
    return data;
  },

  // Registrar una salida de producto
  async registrarSalida({ producto_id, cantidad, usuario_id, observaciones }) {
    // Insertar la salida en la tabla 'salidas'
    const { data, error } = await supabase
      .from('salidas')
      .insert([{ producto_id, cantidad, usuario_id, observaciones }]);

    if (error) throw new Error(error.message);

    // Actualizar el stock actual del producto
    await this.actualizarStock(producto_id, cantidad, 'salida');
    return data;
  },

  // Actualizar el stock del producto
  async actualizarStock(producto_id, cantidad, tipo) {
    const { data: producto, error } = await supabase
      .from('productos')
      .select('stock_actual')
      .eq('producto_id', producto_id)
      .single();

    if (error) throw new Error(error.message);

    let nuevoStock;
    if (tipo === 'entrada') {
      nuevoStock = producto.stock_actual + cantidad;
    } else if (tipo === 'salida') {
      nuevoStock = producto.stock_actual - cantidad;
      if (nuevoStock < 0) throw new Error('El stock no puede ser negativo');
    }

    // Actualizar el stock en la base de datos
    const { error: updateError } = await supabase
      .from('productos')
      .update({ stock_actual: nuevoStock })
      .eq('producto_id', producto_id);

    if (updateError) throw new Error(updateError.message);
  }
};

export default Inventario;