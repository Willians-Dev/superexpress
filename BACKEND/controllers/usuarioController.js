// controllers/usuarioController.js
import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

export const crearUsuario = async (req, res) => {
  try {
    const data = await Usuario.crearUsuario(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const data = await Usuario.obtenerUsuarios();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const data = await Usuario.eliminarUsuario(id);
    if (!data) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para cambiar la contraseña del usuario
export const cambiarContrasena = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del usuario desde los parámetros de la URL
  const { contrasena } = req.body;  // Obtener la nueva contraseña desde el cuerpo de la solicitud

  try {
    // Verificar si se recibió una nueva contraseña
    if (!contrasena) {
      return res.status(400).json({ message: 'Se requiere una nueva contraseña.' });
    }

    // Generar un salt y encriptar la nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Actualizar la contraseña en la base de datos
    const data = await Usuario.actualizarUsuario(id, { contrasena: hashedPassword });

    res.status(200).json({ message: 'Contraseña actualizada correctamente', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};