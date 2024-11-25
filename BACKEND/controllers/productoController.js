// controllers/productoController.js
import Producto from '../models/productoModel.js';

export const crearProducto = async (req, res) => {
  try {
    const data = await Producto.crearProducto(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const data = await Producto.obtenerProductos();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Producto.obtenerProductoPorId(id);
    if (!data) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Producto.actualizarProducto(id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Producto.eliminarProducto(id);
    if (!data) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerProductoPorCodigoBarra = async (req, res) => {
  const { codigo_barra } = req.params;
  try {
    const data = await Producto.obtenerProductoPorCodigoBarra(codigo_barra);
    if (!data) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};