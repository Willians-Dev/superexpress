import express from 'express';
import { registrarVenta } from '../controllers/ventaController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/ventas', authMiddleware, registrarVenta);

export default router;