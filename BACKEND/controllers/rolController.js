// controllers/rolController.js
import Rol from '../models/rolModel.js';

export const crearRol = async (req, res) => {
  try {
    const data = await Rol.crearRol(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerRoles = async (req, res) => {
  try {
    const data = await Rol.obtenerRoles();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerRolPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Rol.obtenerRolPorId(id);
    if (!data) return res.status(404).json({ message: "Rol no encontrado" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarRol = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Rol.actualizarRol(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Rol.eliminarRol(id);
    if (!data) return res.status(404).json({ message: "Rol no encontrado" });
    res.status(200).json({ message: "Rol eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};