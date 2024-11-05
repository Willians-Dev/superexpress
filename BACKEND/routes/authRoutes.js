// routes/authRoutes.js
import express from 'express';
import { loginUsuario, obtenerUsuarioActual } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', loginUsuario);

// Ruta para obtener los datos del usuario actual
router.get('/usuario', authMiddleware, obtenerUsuarioActual);

export default router;