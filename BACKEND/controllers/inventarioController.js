// controllers/inventarioController.js
import Inventario from '../models/inventarioModel.js';

export const registrarEntrada = async (req, res) => {
  try {
    const data = await Inventario.registrarEntrada(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registrarSalida = async (req, res) => {
  try {
    const data = await Inventario.registrarSalida(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};