// routes/authRoutes.js
import express from 'express';
import { loginUsuario } from '../controllers/authController.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', loginUsuario);

export default router;