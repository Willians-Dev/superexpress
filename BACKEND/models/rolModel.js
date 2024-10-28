// models/rolModel.js
import supabase from '../config/db.js';

const Rol = {
  async crearRol({ rol_nombre, descripcion }) {
    const { data, error } = await supabase
      .from('roles')
      .insert([{ rol_nombre, descripcion }]);

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerRoles() {
    const { data, error } = await supabase
      .from('roles')
      .select('*');

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerRolPorId(rol_id) {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .eq('rol_id', rol_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarRol(rol_id, { rol_nombre, descripcion }) {
    const { data, error } = await supabase
      .from('roles')
      .update({ rol_nombre, descripcion })
      .eq('rol_id', rol_id);

    if (error) throw new Error(error.message);
    return data;
  },

  async eliminarRol(rol_id) {
    const { data, error } = await supabase
      .from('roles')
      .delete()
      .eq('rol_id', rol_id);

    if (error) throw new Error(error.message);
    return data;
  }
};

export default Rol;