import express from 'express';
import { 
  crearUsuario, 
  obtenerUsuarios, 
  obtenerUsuarioPorId, 
  actualizarUsuario, 
  eliminarUsuario,
  cambiarContrasena // Importar el controlador de cambio de contraseña
} from '../controllers/usuarioController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Middleware de autenticación

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

// Ruta para cambiar la contraseña del usuario autenticado
router.put('/usuarios/cambiar-password', authMiddleware, cambiarContrasena);

export default router;