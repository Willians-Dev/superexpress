import supabase from '../config/db.js';
import bcrypt from 'bcrypt';

const Usuario = {
  async crearUsuario({ nombre, apellido, correo, contrasena, rol_id }) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nombre, apellido, correo, contrasena: hashedPassword, rol_id }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerUsuarios() {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerUsuarioPorId(usuario_id) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('usuario_id', usuario_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async actualizarUsuario(usuario_id, { nombre, apellido, correo, contrasena, rol_id }) {
    const updateData = {
      nombre,
      apellido,
      correo,
      ...(contrasena && { contrasena: await bcrypt.hash(contrasena, 10) }),
      rol_id,
    };

    const { data, error } = await supabase
      .from('usuarios')
      .update(updateData)
      .eq('usuario_id', usuario_id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async eliminarUsuario(usuario_id) {
    // Verificar si el usuario existe
    const usuarioExistente = await this.obtenerUsuarioPorId(usuario_id);
    if (!usuarioExistente) {
      throw new Error('Usuario no encontrado');
    }

    const { data, error } = await supabase
      .from('usuarios')
      .delete()
      .eq('usuario_id', usuario_id);

    if (error) throw new Error(error.message);

    return true;
  },

  async obtenerUsuarioPorCorreo(correo) {
    console.log("Buscando usuario con correo:", correo);
    const { data, error } = await supabase.from('usuarios').select('*').eq('correo', correo);

    if (error) {
      console.error("Error en obtenerUsuarioPorCorreo:", error.message);
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return null; // No se encontró ningún usuario
    } else if (data.length > 1) {
      throw new Error('Se encontraron múltiples usuarios con el mismo correo.');
    }

    console.log("Usuario encontrado:", data[0]);
    return data[0];
  },
};

export default Usuario;