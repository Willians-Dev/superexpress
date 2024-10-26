// routes/usuarioRoutes.js
import express from 'express';
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/usuarios', authMiddleware, obtenerUsuarios);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', authMiddleware, obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/usuarios', authMiddleware, crearUsuario);

// Ruta para actualizar un usuario
router.put('/usuarios/:id', authMiddleware, actualizarUsuario);

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', authMiddleware, eliminarUsuario);

export default router;