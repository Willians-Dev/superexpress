import express from 'express';
import { obtenerPresentaciones, crearPresentacion, eliminarPresentacion } from '../controllers/presentacionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/presentaciones', authMiddleware, obtenerPresentaciones);
router.post('/presentaciones', authMiddleware, crearPresentacion);
router.delete('/presentaciones/:id', authMiddleware, eliminarPresentacion);

export default router;