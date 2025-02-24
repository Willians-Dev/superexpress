//BACKEND\models\presentacionModel.js
import supabase from '../config/db.js';

const Presentacion = {
  // ✅ Obtener todas las presentaciones
  async obtenerPresentaciones() {
    const { data, error } = await supabase
      .from('presentaciones')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  },

  // ✅ Obtener una presentación por ID (para verificar antes de eliminar)
  async obtenerPresentacionPorId(presentacion_id) {
    const { data, error } = await supabase
      .from('presentaciones')
      .select('*')
      .eq('presentacion_id', presentacion_id)
      .single();

    if (error) return null; // Si no existe, retorna null
    return data;
  },

  // ✅ Crear una nueva presentación (ahora permite descripción)
  async crearPresentacion({ nombre, descripcion }) {
    const { data, error } = await supabase
      .from('presentaciones')
      .insert([{ nombre, descripcion }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // ✅ Eliminar una presentación (con verificación)
  async eliminarPresentacion(presentacion_id) {
    const { error } = await supabase
      .from('presentaciones')
      .delete()
      .eq('presentacion_id', presentacion_id);

    if (error) throw new Error(error.message);
    return { deleted: true }; // ✅ Retornar confirmación de eliminación
  },

  async actualizarPresentacion(presentacion_id, { nombre, descripcion }) {
    const { data, error } = await supabase
      .from('presentaciones')
      .update({ nombre, descripcion })
      .eq('presentacion_id', presentacion_id)
      .select(); // ✅ Traer la presentación actualizada para verificar si existe

    if (error) throw new Error(error.message);
    return data.length > 0 ? data[0] : null; // ✅ Retorna null si no se encontró
  },
};

export default Presentacion;