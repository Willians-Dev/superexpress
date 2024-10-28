// app.js
import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Rutas de autenticación
import rolRoutes from './routes/rolRoutes.js';  // Importar las rutas de roles
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes); // Usar las rutas de autenticación
app.use('/api', rolRoutes);  // Usar las rutas de roles

// Inicializar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});