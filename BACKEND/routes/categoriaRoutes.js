// routes/categoriaRoutes.js
import express from 'express';
import { crearCategoria, obtenerCategorias, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria } from '../controllers/categoriaController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas para categorías
router.get('/categorias', authMiddleware, obtenerCategorias);
router.get('/categorias/:id', authMiddleware, obtenerCategoriaPorId);
router.post('/categorias', authMiddleware, crearCategoria);
router.put('/categorias/:id', authMiddleware, actualizarCategoria);
router.delete('/categorias/:id', authMiddleware, eliminarCategoria);

export default router;