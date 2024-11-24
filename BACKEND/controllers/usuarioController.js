// controllers/usuarioController.js
import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

export const crearUsuario = async (req, res) => {
  const { nombre, apellido, correo, contrasena, rol_id } = req.body;

  // Validaciones de campos requeridos
  if (!nombre || !apellido || !correo || !contrasena || !rol_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validar formato del correo
  if (!/\S+@\S+\.\S+/.test(correo)) {
    return res.status(400).json({ message: 'Correo no válido' });
  }

  // Validar longitud mínima de la contraseña
  if (contrasena.length < 8) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
  }

  try {
    // Verificar si el correo ya está registrado
    const usuarioExistente = await Usuario.obtenerUsuarioPorCorreo(correo);
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Crear el usuario
    const nuevoUsuario = {
      nombre,
      apellido,
      correo,
      contrasena: hashedPassword,
      rol_id,
    };

    const data = await Usuario.crearUsuario(nuevoUsuario);

    // Excluir contraseña antes de enviar la respuesta
    const { contrasena: omit, ...usuarioSinPassword } = data;
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const data = await Usuario.obtenerUsuarios();

    // Excluir contraseñas de los usuarios antes de enviarlos al frontend
    const usuariosSinContrasena = data.map(({ contrasena, ...usuario }) => usuario);

    res.status(200).json(usuariosSinContrasena);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Usuario.obtenerUsuarioPorId(id);
    if (!data) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Usuario.actualizarUsuario(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioExistente = await Usuario.obtenerUsuarioPorId(id);

    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const data = await Usuario.eliminarUsuario(id);

    if (!data) {
      return res.status(500).json({ message: 'Error al eliminar el usuario' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador para cambiar la contraseña del usuario
export const cambiarContrasena = async (req, res) => {
  const { id } = req.params;
  const { contrasena } = req.body;

  if (!contrasena || contrasena.length < 8) {
    return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 8 caracteres.' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const data = await Usuario.actualizarUsuario(id, { contrasena: hashedPassword });

    if (!data) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};