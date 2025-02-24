import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  let user = null;

  // Validar si los datos del usuario están correctamente almacenados en localStorage
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error('Error al analizar el usuario de localStorage:', error);
      localStorage.removeItem('user'); // Eliminar datos corruptos
      return <Navigate to="/" replace />; // Redirigir al login
    }
  }

  // Redirigir al login si no hay token o usuario
  if (!token || !user) {
    console.warn('Sesión no encontrada. Redirigiendo al login...');
    return <Navigate to="/" replace />;
  }

  // Normalizar requiredRole como array para evitar errores
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Validar roles si se especifican
  if (requiredRole && !roles.includes(user.rol_id)) {
    console.warn('Acceso denegado. Rol insuficiente.');
    return <Navigate to="/no-autorizado" replace />;
  }

  // Renderizar los hijos si todas las condiciones se cumplen
  return children;
};

export default PrivateRoute;