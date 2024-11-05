import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';

// Ruta privada que requiere autenticación
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir a la página de inicio de sesión
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para la página de login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas protegidas por autenticación */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />

        {/* Ruta por defecto para manejar rutas no definidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;