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
        categorias (nombre),
        presentaciones (nombre)
      `);
  
    if (error) throw new Error(error.message);
  
    return data.map((producto) => ({
      ...producto,
      categoria: producto.categorias?.nombre || 'Sin Categoría',
      presentacion: producto.presentaciones?.nombre || 'Sin Presentación',
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
    console.log("🔍 ID recibido en el modelo para eliminar:", producto_id);
  
    const { error } = await supabase
      .from("productos")
      .delete()
      .eq("producto_id", producto_id);
  
    if (error) {
      console.error("❌ Error en la consulta de eliminación:", error.message);
      throw new Error(error.message);
    }
  
    console.log("✅ Producto eliminado correctamente en la base de datos.");
    return true; // 🔥 Retornar `true` en lugar de `null` para evitar el error en el backend
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