// models/categoriaModel.js
import supabase from '../config/db.js';

const Categoria = {
  async crearCategoria({ nombre, descripcion }) {
    const { data, error } = await supabase
      .from('categorias')
      .insert([{ nombre, descripcion }]);

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerCategorias() {
    const { data, error } = await supabase
      .from('categorias')
      .select('*');

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerCategoriaPorId(categoria_id) {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('categoria_id', categoria_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarCategoria(categoria_id, { nombre, descripcion }) {
    const { data, error } = await supabase
      .from('categorias')
      .update({ nombre, descripcion })
      .eq('categoria_id', categoria_id);

    if (error) throw new Error(error.message);
    return data;
  },

  async eliminarCategoria(categoria_id) {
    console.log('ID recibido en el modelo:', categoria_id); // Debugging
  
    // 1️⃣ Verificar si la categoría existe antes de eliminarla
    const { data: categoriaExistente, error: errorExistencia } = await supabase
      .from("categorias")
      .select("categoria_id")
      .eq("categoria_id", categoria_id)
      .single();
  
    if (errorExistencia || !categoriaExistente) {
      console.error("❌ Categoría no encontrada en la BD");
      throw new Error("Categoría no encontrada");
    }
  
    // 2️⃣ Proceder a eliminar si la categoría existe
    const { data, error } = await supabase
      .from("categorias")
      .delete()
      .eq("categoria_id", categoria_id);
  
    console.log("Resultado de eliminación:", data, error);
  
    if (error) throw new Error(error.message);
  
    return true;
  }  
  
};

export default Categoria;