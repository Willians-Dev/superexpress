// routes/productoRoutes.js
import express from 'express';
import { 
    crearProducto, 
    obtenerProductos, 
    obtenerProductoPorId, 
    actualizarProducto, 
    eliminarProducto,
    obtenerProductoPorCodigoBarra,
    obtenerProductosStockCritico,
    obtenerProductosPorVencer 
} from '../controllers/productoController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Middleware de autenticación, si es necesario

const router = express.Router();

// Rutas para productos

router.get("/productos/por-vencer", authMiddleware, obtenerProductosPorVencer);
router.get('/productos', authMiddleware, obtenerProductos);
router.get('/productos/:id', authMiddleware, obtenerProductoPorId);
router.post('/productos', authMiddleware, crearProducto);
router.put('/productos/:id', authMiddleware, actualizarProducto);
router.delete('/productos/:id', authMiddleware, eliminarProducto);
router.get('/productos/barcode/:codigo_barra', authMiddleware, obtenerProductoPorCodigoBarra);
// ✅ Obtener productos con stock crítico
router.get("/productos/stock-critico", authMiddleware, obtenerProductosStockCritico);

export default router;