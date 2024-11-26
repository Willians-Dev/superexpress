// models/presentacionModel.js
import supabase from '../config/db.js';

const Presentacion = {
  // Obtener todas las presentaciones
  async obtenerPresentaciones() {
    const { data, error } = await supabase
      .from('presentaciones')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  },

  // Crear una nueva presentación
  async crearPresentacion({ nombre }) {
    const { data, error } = await supabase
      .from('presentaciones')
      .insert([{ nombre }]);

    if (error) throw new Error(error.message);
    return data[0];
  },

  // Eliminar una presentación por ID
  async eliminarPresentacion(presentacion_id) {
    const { data, error } = await supabase
      .from('presentaciones')
      .delete()
      .eq('presentacion_id', presentacion_id);

    if (error) throw new Error(error.message);
    return data;
  },
};

export default Presentacion;