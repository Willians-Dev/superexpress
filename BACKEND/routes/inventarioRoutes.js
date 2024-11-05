// routes/inventarioRoutes.js
import express from 'express';
import { registrarEntrada, registrarSalida } from '../controllers/inventarioController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Si se requiere autenticación

const router = express.Router();

// Ruta para registrar una entrada de producto
router.post('/entradas', authMiddleware, registrarEntrada);

// Ruta para registrar una salida de producto
router.post('/salidas', authMiddleware, registrarSalida);

export default router;