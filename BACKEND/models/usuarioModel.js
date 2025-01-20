// models/usuarioModel.js
import supabase from '../config/db.js';
import bcrypt from 'bcrypt';

const Usuario = {
  async crearUsuario({ nombre, apellido, correo, contrasena, rol_id }) {
    // Generar un salt y encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ nombre, apellido, correo, contrasena: hashedPassword, rol_id }]);

    if (error) throw new Error(error.message);
    return data;
  },

  async obtenerUsuarios() {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');
    
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
    const { data, error } = await supabase
      .from('usuarios')
      .update({ nombre, apellido, correo, contrasena, rol_id })
      .eq('usuario_id', usuario_id);
    
    if (error) throw new Error(error.message);
    return data;
  },

  async eliminarUsuario(usuario_id) {
    const { data, error } = await supabase
      .from('usuarios')
      .delete()
      .eq('usuario_id', usuario_id);
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Función para obtener un usuario por correo electrónico
  async obtenerUsuarioPorCorreo(correo) {
    console.log("Buscando usuario con correo:", correo); // Depuración
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .single();
  
    if (error) {
      console.error("Error en obtenerUsuarioPorCorreo:", error.message); // Depuración
      if (error.code === 'PGRST116') {
        return null; // Usuario no encontrado
      }
      throw new Error(error.message);
    }
  
    console.log("Usuario encontrado:", data); // Depuración
    return data;
  } 

};

export default Usuario;