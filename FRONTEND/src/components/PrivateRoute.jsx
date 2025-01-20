import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  let user = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error('Error al analizar el usuario de localStorage:', error);
      localStorage.removeItem('user');
      return <Navigate to="/" replace />;
    }
  }

  if (!token || !user) {
    console.warn('Sesión no encontrada. Redirigiendo al login...');
    return <Navigate to="/" replace />;
  }

  // Normaliza `requiredRole` como un array para evitar errores
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (requiredRole && !roles.includes(user.rol_id)) {
    console.warn('Acceso denegado. Rol insuficiente.');
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
};

export default PrivateRoute;