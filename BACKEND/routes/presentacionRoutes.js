import express from 'express';
import { obtenerPresentaciones, crearPresentacion, actualizarPresentacion, eliminarPresentacion } from '../controllers/presentacionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/presentaciones', authMiddleware, obtenerPresentaciones);
router.post('/presentaciones', authMiddleware, crearPresentacion);
router.put('/presentaciones/:id', authMiddleware, actualizarPresentacion); // ✅ Verificar que existe
router.delete('/presentaciones/:id', authMiddleware, eliminarPresentacion);

export default router;