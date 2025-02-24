import express from "express";
import { registrarVenta, obtenerVenta, obtenerVentasPorRango } from "../controllers/ventaController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Registrar una venta
router.post("/ventas", authMiddleware, registrarVenta);

// ✅ Obtener los detalles de una venta específica
router.get("/ventas/:venta_id", authMiddleware, obtenerVenta);

// ✅ Obtener todas las ventas en un rango de fechas
router.get("/ventas/rango", authMiddleware, obtenerVentasPorRango);

export default router;