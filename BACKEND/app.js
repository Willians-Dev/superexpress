import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Rutas de autenticación
import rolRoutes from './routes/rolRoutes.js';  // Importar las rutas de roles
import productoRoutes from './routes/productoRoutes.js';  // Importar las rutas de productos
import inventarioRoutes from './routes/inventarioRoutes.js';  // Importar las rutas de inventario
import categoriaRoutes from './routes/categoriaRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js'; // ✅ Solo esta importación
import presentacionRoutes from './routes/presentacionRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);
app.use('/api', rolRoutes);
app.use('/api', productoRoutes);
app.use('/api', inventarioRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', ventaRoutes); // ✅ Ya no hay duplicado
app.use('/api', presentacionRoutes);

// Inicializar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});