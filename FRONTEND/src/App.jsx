import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Inicio from './pages/Inicio'; // Importa la página de inicio
import Usuarios from './pages/Usuarios';
import Productos from './pages/Productos';
import Unauthorized from './pages/Unauthorized'; // Página para acceso denegado

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.rol_id !== requiredRole) {
    return <Navigate to="/no-autorizado" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas privadas */}
        <Route path="/inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute requiredRole={1}><Usuarios /></PrivateRoute>}/> // Solo para administradores 
        <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />

        {/* Ruta para acceso no autorizado */}
        <Route path="/no-autorizado" element={<Unauthorized />} />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;