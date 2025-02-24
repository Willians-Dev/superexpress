// controllers/authController.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

export const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body; // Aquí declaras `contrasena`

  console.log('Datos recibidos en /login:', req.body);

  try {
    const usuario = await Usuario.obtenerUsuarioPorCorreo(correo);
    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena); // Error puede ocurrir aquí
    console.log('¿Coinciden las contraseñas?', passwordMatch);

    if (!passwordMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    const token = generarToken(usuario);
    console.log('Token generado:', token);

    res.status(200).json({ token, user: usuario });
  } catch (error) {
    console.error('Error en loginUsuario:', error.message);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

export const obtenerUsuarioActual = async (req, res) => {
  try {
    // El usuario está en req.user porque el token ha sido verificado en el middleware
    const usuarioId = req.user.id;
    const usuario = await Usuario.obtenerUsuarioPorId(usuarioId);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Opcionalmente, puedes omitir ciertos campos, como la contraseña
    const { contrasena, ...usuarioData } = usuario;

    res.status(200).json(usuarioData);
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