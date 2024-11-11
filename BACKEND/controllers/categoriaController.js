// controllers/categoriaController.js
import Categoria from '../models/categoriaModel.js';

export const crearCategoria = async (req, res) => {
  try {
    const data = await Categoria.crearCategoria(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerCategorias = async (req, res) => {
  try {
    const data = await Categoria.obtenerCategorias();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Categoria.obtenerCategoriaPorId(id);
    if (!data) return res.status(404).json({ message: "Categoría no encontrada" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Categoria.actualizarCategoria(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Categoria.eliminarCategoria(id);
    if (!data) return res.status(404).json({ message: "Categoría no encontrada" });
    res.status(200).json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};