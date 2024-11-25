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
      .select(`
        *,
        categorias (nombre)
      `);
  
    if (error) throw new Error(error.message);
    return data.map(producto => ({
      ...producto,
      categoria: producto.categorias.nombre // Extrae el nombre de la categoría
    }));
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
  },

  async obtenerProductoPorCodigoBarra(codigo_barra) {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('codigo_barra', codigo_barra)
      .single();
  
    if (error) throw new Error(error.message);
    return data;
  }
  
};

export default Producto;