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
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  try {
    const data = await Presentacion.crearPresentacion({ nombre, descripcion }); // ✅ Ahora usa el modelo
    res.status(201).json(data);
  } catch (error) {
    console.error("Error al crear presentación:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const eliminarPresentacion = async (req, res) => {
  const { id } = req.params;

  try {
    // ✅ Verificar si la presentación existe antes de eliminar
    const presentacion = await Presentacion.obtenerPresentacionPorId(id);
    if (!presentacion) {
      return res.status(404).json({ message: "Presentación no encontrada" });
    }

    // ✅ Intentar eliminarla
    const eliminado = await Presentacion.eliminarPresentacion(id);
    if (eliminado) {
      res.status(200).json({ message: "Presentación eliminada exitosamente" });
    } else {
      res.status(500).json({ message: "No se pudo eliminar la presentación" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};