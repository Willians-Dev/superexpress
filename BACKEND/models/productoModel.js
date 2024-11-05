// models/productoModel.js
import supabase from '../config/db.js';

const Producto = {
  async crearProducto({ nombre, presentacion, descripcion, codigo_barra, precio, stock_actual, stock_minimo, fecha_caducidad, categoria_id }) {
    const { data, error } = await supabase
      .from('productos')
      .insert([{ 
        nombre, 
        presentacion, 
        descripcion, 
        codigo_barra, 
        precio, 
        stock_actual, 
        stock_minimo, 
        fecha_caducidad, 
        categoria_id 
      }]);

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerProductos() {
    const { data, error } = await supabase
      .from('productos')
      .select('*, categorias(nombre)'); // Obtener también la categoría

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerProductoPorId(producto_id) {
    const { data, error } = await supabase
      .from('productos')
      .select('*, categorias(nombre)')
      .eq('producto_id', producto_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarProducto(producto_id, { nombre, presentacion, descripcion, codigo_barra, precio, stock_actual, stock_minimo, fecha_caducidad, categoria_id }) {
    const { data, error } = await supabase
      .from('productos')
      .update({
        nombre, 
        presentacion, 
        descripcion, 
        codigo_barra, 
        precio, 
        stock_actual, 
        stock_minimo, 
        fecha_caducidad, 
        categoria_id 
      })
      .eq('producto_id', producto_id);

    if (error) throw new Error(error.message);
    return data;
  },

  async eliminarProducto(producto_id) {
    const { data, error } = await supabase
      .from('productos')
      .delete()
      .eq('producto_id', producto_id);

    if (error) throw new Error(error.message);
    return data;
  }
};

export default Producto;