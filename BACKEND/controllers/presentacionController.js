import Presentacion from '../models/presentacionModel.js';

export const obtenerPresentaciones = async (req, res) => {
  try {
    const data = await Presentacion.obtenerPresentaciones();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearPresentacion = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }

  try {
    const data = await Presentacion.crearPresentacion({ nombre });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarPresentacion = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Presentacion.eliminarPresentacion(id);
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Presentación no encontrada' });
    }
    res.status(200).json({ message: 'Presentación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};