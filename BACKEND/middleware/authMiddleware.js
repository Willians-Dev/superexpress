// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificar el token usando la misma clave secreta que fue usada para generarlo
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Asegúrate de que el token esté en el formato correcto
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;