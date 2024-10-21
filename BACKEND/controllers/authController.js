// controllers/authController.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';

// Función para generar un token JWT
const generarToken = (usuario) => {
  const payload = {
    id: usuario.usuario_id,
    rol_id: usuario.rol_id, // Esto te permitirá verificar el rol en el middleware
  };

  // Firmar el token con una clave secreta
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Controlador para el login de usuario
export const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuario.obtenerUsuarioPorCorreo(correo); // Función en el modelo
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña (aquí podrías agregar la lógica para comparar la contraseña encriptada)
    if (usuario.contrasena !== contrasena) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar el token JWT
    const token = generarToken(usuario);

    // Enviar el token como respuesta
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};