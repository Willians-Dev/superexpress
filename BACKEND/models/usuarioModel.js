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
      .maybeSingle(); // Evita errores si no hay resultados
  
    if (error) {
      console.error("Error en obtenerUsuarioPorId:", error.message);
      throw new Error(error.message);
    }
  
    if (!data) {
      console.error(`Usuario con ID ${usuario_id} no encontrado.`);
      throw new Error('Usuario no encontrado.');
    }
  
    return data;
  },

  async actualizarUsuario(usuario_id, { nombre, apellido, correo, contrasena, rol_id }) {
    const updateData = {
      nombre,
      apellido,
      correo,
      rol_id,
    };
  
    if (contrasena) {
      updateData.contrasena = await bcrypt.hash(contrasena, 10);
    }
  
    const { data, error } = await supabase
      .from('usuarios')
      .update(updateData)
      .eq('usuario_id', usuario_id)
      .select()
      .maybeSingle(); // Usa maybeSingle para evitar errores
  
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
    
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .maybeSingle(); // Previene errores cuando no hay datos
  
    if (error) {
      console.error("Error en obtenerUsuarioPorCorreo:", error.message);
      throw new Error(error.message);
    }
  
    if (!data) {
      console.log(`No se encontró usuario con el correo ${correo}`);
      return null;
    }
  
    console.log("Usuario encontrado:", data);
    return data;
  },

};

export default Usuario;