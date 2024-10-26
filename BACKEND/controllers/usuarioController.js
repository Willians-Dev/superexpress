// controllers/usuarioController.js
import Usuario from '../models/usuarioModel.js';

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