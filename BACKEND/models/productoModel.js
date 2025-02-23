import supabase from '../config/db.js';

const Producto = {
  async crearProducto({ nombre, presentacion_id, descripcion, codigo_barra, precio, stock_actual, stock_minimo, fecha_caducidad, categoria_id, sensible_vencimiento }) {
    // ✅ Convertir presentacion_id a número para evitar errores
    const presentacion = presentacion_id ? parseInt(presentacion_id, 10) : null;

    // Verificar si el código de barras ya existe
    const { data: existingProduct, error: checkError } = await supabase
      .from('productos')
      .select('codigo_barra')
      .eq('codigo_barra', codigo_barra)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw new Error(checkError.message);
    }

    if (existingProduct) {
      throw new Error("El código de barras ya está en uso.");
    }

    // Insertar el nuevo producto si el código de barras no existe
    const { data, error } = await supabase
      .from('productos')
      .insert([{ 
        nombre, 
        presentacion_id: presentacion, 
        descripcion, 
        codigo_barra, 
        precio, 
        stock_actual, 
        stock_minimo, 
        fecha_caducidad, 
        categoria_id,
        sensible_vencimiento: !!sensible_vencimiento // Asegurar booleano
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
      .select('*, categorias(nombre), presentaciones(nombre)')
      .eq('producto_id', producto_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarProducto(producto_id, { nombre, presentacion_id, descripcion, codigo_barra, precio, stock_actual, stock_minimo, fecha_caducidad, categoria_id, sensible_vencimiento }) {
    const presentacion = presentacion_id ? parseInt(presentacion_id, 10) : null;

    const { data, error } = await supabase
      .from('productos')
      .update({
        nombre, 
        presentacion_id: presentacion,
        descripcion, 
        codigo_barra, 
        precio, 
        stock_actual, 
        stock_minimo, 
        fecha_caducidad, 
        categoria_id,
        sensible_vencimiento: !!sensible_vencimiento // Asegurar booleano
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
    return true;
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