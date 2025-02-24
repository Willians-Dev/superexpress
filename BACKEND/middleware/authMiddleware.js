import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('Token no proporcionado');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded); // Log del token decodificado
    req.user = decoded;

    if (!req.user.id) {
      return res.status(403).json({ message: 'Token inválido. No se encontró el ID de usuario.' });
    }

    next();
  } catch (error) {
    console.log('Error en el token:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;