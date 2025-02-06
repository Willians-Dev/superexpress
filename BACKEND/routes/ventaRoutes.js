import express from "express";
import { registrarVenta, obtenerVenta } from "../controllers/ventaController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Registrar una venta
router.post("/ventas", authMiddleware, registrarVenta);

// ✅ Obtener los detalles de una venta
router.get("/ventas/:venta_id", authMiddleware, obtenerVenta);

export default router;