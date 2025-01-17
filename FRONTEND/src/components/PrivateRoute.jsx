const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  let user = null;

  // Intenta parsear el JSON solo si `userString` no es null
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error('Error al parsear el usuario:', error);
      user = null;
    }
  }

  if (!token || !user) {
    console.warn('Token o usuario no encontrado. Redirigiendo al login...');
    return <Navigate to="/" />;
  }

  if (requiredRole && user.rol_id !== requiredRole) {
    console.warn('Acceso denegado. Rol insuficiente.');
    return <Navigate to="/no-autorizado" />;
  }

  return children;
};