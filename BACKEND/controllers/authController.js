// controllers/authController.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

export const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuario.obtenerUsuarioPorCorreo(correo);
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña ingresada con la contraseña encriptada almacenada
    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordMatch) {
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

// Función para generar un token JWT
const generarToken = (usuario) => {
  const payload = {
    id: usuario.usuario_id,
    rol_id: usuario.rol_id,
  };
// Firmar el token con una clave secreta
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};