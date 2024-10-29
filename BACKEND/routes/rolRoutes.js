// routes/rolRoutes.js
import express from 'express';
import { crearRol, obtenerRoles, obtenerRolPorId, actualizarRol, eliminarRol } from '../controllers/rolController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Si quieres proteger estas rutas

const router = express.Router();

// Ruta para obtener todos los roles
router.get('/roles', authMiddleware, obtenerRoles);

// Ruta para obtener un rol por ID
router.get('/roles/:id', authMiddleware, obtenerRolPorId);

// Ruta para crear un nuevo rol
router.post('/roles', authMiddleware, crearRol);

// Ruta para actualizar un rol
router.put('/roles/:id', authMiddleware, actualizarRol);

// Ruta para eliminar un rol
router.delete('/roles/:id', authMiddleware, eliminarRol);

export default router;