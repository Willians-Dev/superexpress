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
    obtenerProductosPorVencer,
    obtenerVentasPorFecha
} from '../controllers/productoController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Middleware de autenticación, si es necesario

const router = express.Router();

// Rutas para productos
router.get('/ventas/reporte', authMiddleware, obtenerVentasPorFecha);
router.get("/productos/stock-critico", authMiddleware, obtenerProductosStockCritico);
router.get("/productos/por-vencer", authMiddleware, obtenerProductosPorVencer);
router.get('/productos', authMiddleware, obtenerProductos);
router.get('/productos/:id', authMiddleware, obtenerProductoPorId);
router.post('/productos', authMiddleware, crearProducto);
router.put('/productos/:id', authMiddleware, actualizarProducto);
router.delete('/productos/:id', authMiddleware, eliminarProducto);
router.get('/productos/barcode/:codigo_barra', authMiddleware, obtenerProductoPorCodigoBarra);

export default router;